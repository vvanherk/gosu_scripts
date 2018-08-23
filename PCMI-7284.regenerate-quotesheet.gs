uses java.io.FileOutputStream
uses ca.cooperators.pc.ratabase.tools.support.QuoteLoggerSearchResult
//uses ca.cooperators.pc.ratabase.tools.support.messaging.SFTPQuoteLogger
uses gw.api.system.server.ServerUtil
uses gw.api.util.ConfigAccess
uses ca.cooperators.pc.ratabase.tools.support.excel.PremiumVerificationExcelCreator
uses ca.cooperators.pc.ratabase.xmlwrapper.RBCalculationRequest
uses org.apache.commons.io.output.ByteArrayOutputStream

var SEARCH_TF = "yyyy-MM-dd'T'HHmm"
var OUTPUT_TF = "yyyy-MM-dd'T'HHmmss"

var JOB_NUMBERS = {
  "71218331" ->{ "2016-05-02T1507" }
, "74190519" ->{ "2016-05-20T1432" }  
, "149514593" ->{ "2016-05-24T1429", "2016-05-18T1822", "2016-05-17T1851" }
}

function generateQuoteSheet(jobNumber : String, createTimes : String[]) {
  var quotes = QuoteLoggerSearchResult.searchByJobNumber(jobNumber)

  quotes.where(\ q ->createTimes.contains(q.CreateTime.format(SEARCH_TF))).each(\ q ->{
    generateQuoteSheet(q)
  })
}

function generateQuoteSheet(quote : QuoteLoggerSearchResult) {
  var ctx = ca.cooperators.pc.ratabase.tools.support.policyperiodratabaseexecutioncontextmodel_cg.PolicyPeriodRatabaseExecutionContext.parse(quote.MessagePayload)
  var comm = ctx.RatabaseCommunication.Entry.first()
  var sliceDate = comm.SliceDate
  var rbRequest = new RBCalculationRequest(comm.RatabaseRequest)
  var f = ConfigAccess.getConfigFile("config/templates/capping/Template_Full.xlsm")
  var excelCreator = new PremiumVerificationExcelCreator(f)
  var wb = excelCreator.createExcelOutput(ctx, rbRequest, sliceDate)

  var targetExcelLog = new java.io.File("/var/log/policycenter/${ServerUtil.getEnv()}/${quote.CreateTime.format(OUTPUT_TF)}.${ctx.QUOTE_SHEET_REFID}.log")
  var os = new FileOutputStream(targetExcelLog)

  wb.write(os)

  print("Quote ID: ${ctx.QUOTE_SHEET_REFID}")  
}
