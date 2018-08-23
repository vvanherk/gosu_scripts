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

var pperiod = Job.slicedPeriod('4233262')

print (pperiod)

return testPolicy()

function testPolicy() : String {
  var POLICY_NUMBER = "4050039340"
  var periods = find (
    x in PolicyPeriod 
    where x.PolicyNumber == POLICY_NUMBER
    //and x.Status == typekey.PolicyPeriodStatus.TC_CANCELING
  )
/*
  periods.each(\ pp ->{
    print(pp.Status + "  " + pp.Cancellation.CancelReasonCode)
    new TestIssuedCancellationHandler(pp.Job.JobNumber).showAvailableDocuments()
  })
*/
  new TestIssuedCancellationHandler(pperiod.Job.JobNumber).showAvailableDocuments()
  
  new TestIssuedCancellationHandler(pperiod.Job.JobNumber).determineDocProdDocuments(pperiod)
    
 // TestBase.assertEquals(EXPECTED, RESULTS)

  var docCode = "FPREM201"
  INCLUSIONLIST.each(\ dpc ->{
    if(dpc.equalsIgnoreCase(docCode)) {
      print("true")
    }
    else {
      print("false")
    }
    })
    

  return OUTPUT.join("\n")
}

class TestIssuedCancellationHandler extends FARM_IssuedCancellationHandler {
  var _jobNumber : String as readonly JOB_NUMBER

  construct (jobNumber : String) {
    _jobNumber = jobNumber
  }

  function showAvailableDocuments() {
    var pp = Job.slicedPeriod(JOB_NUMBER)
    print(pp)
    var j = pp.Job
    var cancellationReasons : List<String> = j.CancellationReasons_CG*.CancelReason_CG.map(\ r ->"${r.Code} : ${r.DisplayName}")
    o("{ ${j.Subtype}:${j.JobNumber} }=>" + { 
      "FormCount: ${pp.Forms.Count}"
    , "Source: ${j.Source_CG}"
    , cancellationReasons
    }) 
    determineDocProdDocuments(pp)
    o("")
  }
  
  // PrintRequestHandler.defaultDetermineDocProdDocuments
  function determineDocProdDocuments(period : PolicyPeriod) {
    var formsByGroup = formsToUse(period).partition(\ f ->f.Pattern.GroupCode)

    formsByGroup.eachKeyAndValue(\ group, forms ->{
      var recipientType : typekey.RecipientType_CG
      switch (group) {
        case "MORTGAGEE":
          recipientType = typekey.RecipientType_CG.TC_AI
        break
        default:
          recipientType = typekey.RecipientType_CG.TC_AI
        // ignore
      }
      if (recipientType != null) {
        o(StringUtils.rightPad("=={ GroupCode: ${group}, Count: ${forms.Count} }", 120, "="))
        var fd = new FormsCollator(forms)
        processDocs(period, recipientType, fd)
      }
    })
  }

  function processDocs(period : PolicyPeriod, recipientType : typekey.RecipientType_CG, fd : FormsCollator) {
    fd.Keys.each(\ key ->{
      var forms = fd.getMap(key)
      var form = forms.first()
      var ic = "${form.Pattern.InferenceClass}"
      ic = ic.substring(ic.lastIndexOf(".") + 1)
      o(StringUtils.rightPad("--{ PatternCode: ${form.Pattern.Code}, FormNumber: ${form.Pattern.FormNumber}, Class: ${ic} }", 120, "-"))
      if (form.Pattern.Code == "FADDINT113") {
        print("*".repeat(120))
        var jobType = period.Job.SubType
        print("Job SubType: '${jobType}'")
        if (jobType == "Cancellation") {
          var canc = period.Job as Cancellation
          print("Source: '${canc.Source}'")
          print("Status: '${period.Status}'")
        }
        print("*".repeat(120))
      }
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
