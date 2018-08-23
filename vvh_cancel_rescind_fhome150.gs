uses ca.cooperators.pc.docprod.printrequest.farm.FARM_IssuedCancellationHandler
uses org.apache.commons.lang.StringUtils
uses java.lang.StringBuilder
uses gw.api.util.DisplayableException
uses ca.cooperators.pc.docprod.util.FormsCollator
uses pcf.PartitionedIndexesByTable
uses gw.api.admin.FormPatternUtil
uses java.util.Map
uses gw.testharness.TestBase

var OUTPUT : java.util.List<String> = { "" }

var INCLUSIONLIST : java.util.List<String>  = {"FPREM720", "FPREM201"}

var pperiod = Job.slicedPeriod('4233262') //rescinded - non registered - sit3
//var pperiod = Job.slicedPeriod('4181500574') //cancelled - FMORT100 - local

 
print (pperiod)
print (pperiod.Status)

return testPolicy()

function testPolicy() : String {

// sample test doc codes
  var docCode = "FPREM201"
  INCLUSIONLIST.each(\ dpc ->{
    if(dpc.equalsIgnoreCase(docCode)) {
      print("true")
    }
    else {
      print("false")
    }
  })
    
 var ticHandler = new TestIssuedCancellationHandler(pperiod.Job.JobNumber)
 ticHandler.determineDocProdDocuments(pperiod)   
    
  return OUTPUT.join("\n")
}

class TestIssuedCancellationHandler extends FARM_IssuedCancellationHandler {
  var _jobNumber : String as readonly JOB_NUMBER

  construct (jobNumber : String) {
    _jobNumber = jobNumber
  }

  
  // PrintRequestHandler.defaultDetermineDocProdDocuments
  function determineDocProdDocuments(period : PolicyPeriod) {
    var formsByGroup = formsToUse(period).partition(\ f ->f.Pattern.GroupCode)
    
    print(formsByGroup)

    formsByGroup.eachKeyAndValue(\ group, forms ->{
    var recipientType : typekey.RecipientType_CG = typekey.RecipientType_CG.TC_PH
    
    print(forms)

        var fd = new FormsCollator(forms)
        processDocs(period, recipientType, fd)
    })
  }

  function processDocs(period : PolicyPeriod, recipientType : typekey.RecipientType_CG, fd : FormsCollator) {
    fd.Keys.each(\ key ->{
      var forms = fd.getMap(key)
      print(forms)
      var form = forms.first()
      var ic = "${form.Pattern.InferenceClass}"
      processForm(period, recipientType, form)
    })
  }

  function processForm(period : PolicyPeriod, recipientType : typekey.RecipientType_CG, form : Form) {
    try {
      //doBillingCenterRescindedCancellation(period)
      var documentCode = determineDocProdDocumentCode(period, recipientType, form)
    } catch (e : java.lang.Exception) {
      print("[ERROR] ${typeof e}")
      print(form)
    }
  }

  override protected function retrieveNonNullDocumentCode( 
    productCode           :String,
    bmc                   :BusinessMarketContext_CG,
    transactionType       :typekey.Job,
    cancellationSource    :CancellationSource,
    reason                :String,
    recipientType         :RecipientType_CG,
    aiTypeCode            :String,
    subTransaction        :String
  ) : DocProdDocumentCodes_CG {
    
    var whereClause = new StringBuilder("  retrieveNonNullDocumentCode (")
    whereClause.append("\n  and dc.ProductCode_CG = '${productCode}'")
    whereClause.append("\n  and dc.BusinessMarketContext_CG = '${bmc?.Code}'")
    whereClause.append("\n  and jt.Name = '${transactionType?.Code}'")
    whereClause.append("\n  and cs.Name = '${cancellationSource?.Code}'")
    whereClause.append("\n  and dc.Reason = '${reason}'")
    whereClause.append("\n  and rt.Name = '${recipientType?.Code}'")
    whereClause.append("\n  and dc.AdditionalInterestType_CG = '${aiTypeCode}'")
    whereClause.append("\n  and dc.SubTransaction_CG = '${subTransaction}'")
    whereClause.append("\n  )")
    
    var result = DocumentCodeQueryHelper.retrieveDocumentCode(
      productCode, bmc, transactionType, cancellationSource, reason, recipientType, aiTypeCode, subTransaction
    )
    
    if (result ==  null) {
      o("  [ ERROR ]: no document code found")   
      o(whereClause.toString())
    } else {
      o("  [SUCCESS]: DocumentCode: ${result.DocumentCode_CG}")
    }
//    RESULTS[reason] = result.DocumentCode_CG
    return result
  }

  function doBillingCenterRescindedCancellation(period : PolicyPeriod) {
    new java.lang.Exception().printStackTrace()
    o("========BillingCenter Rescind" )
    
    var productCode        = period.Policy.ProductCode
    var bmc                = period.BusinessMarketContext
    var transactionType    = typekey.Job.TC_CANCELLATION
    var cancellationSource = period.Cancellation.Source_CG
    var reason:String      = null
    var recipientType      = typekey.RecipientType_CG.TC_PH
    var aiTypeCode:String  = null
    var subTransaction     = "BillingCenter.Rescinded"

    var result = retrieveNonNullDocumentCode(
      productCode, bmc, transactionType, cancellationSource, reason, recipientType, aiTypeCode, subTransaction
    )
    o("BillingCenter.Rescinded document code: ${result}")
  }
}

function o(s : String) { OUTPUT.add(s) }
