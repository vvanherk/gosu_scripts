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

var EXPECTED : Map<ReasonCode,String> = {
  typekey.ReasonCode.TC_101 ->"FCANC406"
, typekey.ReasonCode.TC_102 ->"FCANC406"
, typekey.ReasonCode.TC_103 ->"FCANC406"
, typekey.ReasonCode.TC_104 ->"FCANC406"
, typekey.ReasonCode.TC_801 ->"FCANC406"
, typekey.ReasonCode.TC_802 ->"FCANC406"
, typekey.ReasonCode.TC_804 ->"FCANC406"
, typekey.ReasonCode.TC_805 ->"FCANC406"
, typekey.ReasonCode.TC_806 ->"FCANC406"
, typekey.ReasonCode.TC_808 ->"FCANC406"
, typekey.ReasonCode.TC_809 ->"FCANC406"
, typekey.ReasonCode.TC_811 ->"FCANC406"
, typekey.ReasonCode.TC_812 ->"FCANC406"
, typekey.ReasonCode.TC_813 ->"FCANC406"
, typekey.ReasonCode.TC_814 ->"FCANC406"
, typekey.ReasonCode.TC_815 ->"FCANC406"
, typekey.ReasonCode.TC_819 ->"FCANC406"
, typekey.ReasonCode.TC_820 ->"FCANC406"
, typekey.ReasonCode.TC_822 ->"FCANC406"
, typekey.ReasonCode.TC_826 ->"FCANC406"
, typekey.ReasonCode.TC_827 ->"FCANC406"
, typekey.ReasonCode.TC_828 ->"FCANC406"
, typekey.ReasonCode.TC_829 ->"FCANC406"
, typekey.ReasonCode.TC_830 ->"FCANC406"
, typekey.ReasonCode.TC_831 ->"FCANC406"
, typekey.ReasonCode.TC_832 ->"FCANC406"
, typekey.ReasonCode.TC_900 ->"FCANC406"
, typekey.ReasonCode.TC_902 ->"FCANC406"
, typekey.ReasonCode.TC_903 ->"FCANC406"
, typekey.ReasonCode.TC_904 ->"FCANC406"
, typekey.ReasonCode.TC_906 ->"FCANC406"
, typekey.ReasonCode.TC_907 ->"FCANC406"
, typekey.ReasonCode.TC_908 ->"FCANC406"
, typekey.ReasonCode.TC_909 ->"FCANC406"
, typekey.ReasonCode.TC_910 ->"FCANC406"
, typekey.ReasonCode.TC_911 ->"FCANC406"
, typekey.ReasonCode.TC_912 ->"FCANC406"
, typekey.ReasonCode.TC_913 ->"FCANC406"
, typekey.ReasonCode.TC_914 ->"FCANC406"
, typekey.ReasonCode.TC_915 ->"FCANC406"
, typekey.ReasonCode.TC_916 ->"FCANC406"
, typekey.ReasonCode.TC_917 ->"FCANC406"
, typekey.ReasonCode.TC_918 ->"FCANC406"
, typekey.ReasonCode.TC_922 ->"FCANC406"
, typekey.ReasonCode.TC_990 ->"FCANC406"
, typekey.ReasonCode.TC_999 ->"FCANC406"
, typekey.ReasonCode.TC_accountclosed ->"FCANC406"
, typekey.ReasonCode.TC_insufficientfunds ->"FCANC406"
, typekey.ReasonCode.TC_internal ->"FCANC406"
, typekey.ReasonCode.TC_modification ->"FCANC406"
, typekey.ReasonCode.TC_moved ->"FCANC406"
, typekey.ReasonCode.TC_nonpayment ->"FCANC406"
, typekey.ReasonCode.TC_nottaken ->"FMORT300CG"
, typekey.ReasonCode.TC_returnedcheck ->"FCANC406"
}

var RESULTS : Map<ReasonCode,String> = {
  typekey.ReasonCode.TC_101 ->""
, typekey.ReasonCode.TC_102 ->""
, typekey.ReasonCode.TC_103 ->""
, typekey.ReasonCode.TC_104 ->""
, typekey.ReasonCode.TC_801 ->""
, typekey.ReasonCode.TC_802 ->""
, typekey.ReasonCode.TC_804 ->""
, typekey.ReasonCode.TC_805 ->""
, typekey.ReasonCode.TC_806 ->""
, typekey.ReasonCode.TC_808 ->""
, typekey.ReasonCode.TC_809 ->""
, typekey.ReasonCode.TC_811 ->""
, typekey.ReasonCode.TC_812 ->""
, typekey.ReasonCode.TC_813 ->""
, typekey.ReasonCode.TC_814 ->""
, typekey.ReasonCode.TC_815 ->""
, typekey.ReasonCode.TC_819 ->""
, typekey.ReasonCode.TC_820 ->""
, typekey.ReasonCode.TC_822 ->""
, typekey.ReasonCode.TC_826 ->""
, typekey.ReasonCode.TC_827 ->""
, typekey.ReasonCode.TC_828 ->""
, typekey.ReasonCode.TC_829 ->""
, typekey.ReasonCode.TC_830 ->""
, typekey.ReasonCode.TC_831 ->""
, typekey.ReasonCode.TC_832 ->""
, typekey.ReasonCode.TC_900 ->""
, typekey.ReasonCode.TC_902 ->""
, typekey.ReasonCode.TC_903 ->""
, typekey.ReasonCode.TC_904 ->""
, typekey.ReasonCode.TC_906 ->""
, typekey.ReasonCode.TC_907 ->""
, typekey.ReasonCode.TC_908 ->""
, typekey.ReasonCode.TC_909 ->""
, typekey.ReasonCode.TC_910 ->""
, typekey.ReasonCode.TC_911 ->""
, typekey.ReasonCode.TC_912 ->""
, typekey.ReasonCode.TC_913 ->""
, typekey.ReasonCode.TC_914 ->""
, typekey.ReasonCode.TC_915 ->""
, typekey.ReasonCode.TC_916 ->""
, typekey.ReasonCode.TC_917 ->""
, typekey.ReasonCode.TC_918 ->""
, typekey.ReasonCode.TC_922 ->""
, typekey.ReasonCode.TC_990 ->""
, typekey.ReasonCode.TC_999 ->""
, typekey.ReasonCode.TC_accountclosed ->""
, typekey.ReasonCode.TC_insufficientfunds ->""
, typekey.ReasonCode.TC_internal ->""
, typekey.ReasonCode.TC_modification ->""
, typekey.ReasonCode.TC_moved ->""
, typekey.ReasonCode.TC_nonpayment ->""
, typekey.ReasonCode.TC_nottaken ->""
, typekey.ReasonCode.TC_returnedcheck ->""
}

return testPolicy()

function testPolicy() : String {
  var POLICY_NUMBER = "41814125"
  var periods = find (
    x in PolicyPeriod 
    where x.PolicyNumber == POLICY_NUMBER
    and x.Status == typekey.PolicyPeriodStatus.TC_CANCELING
  )
  periods.each(\ pp ->{
    new TestIssuedCancellationHandler(pp.Job.JobNumber).showAvailableDocuments()
  })
  
  TestBase.assertEquals(EXPECTED, RESULTS)

  return OUTPUT.join("\n")
}

class TestIssuedCancellationHandler extends FARM_IssuedCancellationHandler {
  var _jobNumber : String as readonly JOB_NUMBER

  construct (jobNumber : String) {
    _jobNumber = jobNumber
  }

  function showAvailableDocuments() {
    var pp = Job.slicedPeriod(JOB_NUMBER)
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
    RESULTS[reason] = result.DocumentCode_CG
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
