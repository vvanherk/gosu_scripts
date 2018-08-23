uses java.io.FileOutputStream
uses ca.cooperators.pc.ratabase.tools.support.QuoteLoggerSearchResult
uses gw.api.system.server.ServerUtil
uses gw.api.util.ConfigAccess
uses ca.cooperators.pc.ratabase.tools.support.excel.PremiumVerificationExcelCreator
uses ca.cooperators.pc.ratabase.xmlwrapper.RBCalculationRequest
uses org.apache.commons.io.output.ByteArrayOutputStream
uses org.apache.commons.io.FileUtils

var SEARCH_TF = "yyyy-MM-dd'T'HHmm"
var OUTPUT_TF = "yyyy-MM-dd'T'HHmmss"

var SAVE_XML = true
var JOB_NUMBERS = {
  "144973201" ->{ "2016-05-01T2005" }
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

  var LOG_DIR = new java.io.File("/var/log/policycenter/${ServerUtil.getEnv()}")

  var targetExcelLog = new java.io.File(LOG_DIR, "${quote.CreateTime.format(OUTPUT_TF)}.${ctx.QUOTE_SHEET_REFID}.xlsm.vvh.log")
  var os = new FileOutputStream(targetExcelLog)
  wb.write(os)

  if (SAVE_XML) {
    var RB_REQ_XML = new java.io.File(LOG_DIR, "${ctx.QUOTE_SHEET_REFID}.RB_REQUEST.xml.vvh.log")
    var RB_RES_XML = new java.io.File(LOG_DIR, "${ctx.QUOTE_SHEET_REFID}.RB_RESPONSE.xml.vvh.log")
    FileUtils.writeStringToFile(RB_REQ_XML, comm.RatabaseRequest)
    FileUtils.writeStringToFile(RB_RES_XML, comm.RatabaseResponse)
  }

  print("Quote ID: ${ctx.QUOTE_SHEET_REFID}")  
}

JOB_NUMBERS.eachKeyAndValue(\ jobNumber, createTimes ->{
  generateQuoteSheet(jobNumber, createTimes)
})
