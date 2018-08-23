uses gw.api.database.Query

var _formPattern : FormPattern as Pattern

var pp = Job.slicedPeriod("932587") // dev policy
var p = pp.Policy

print({pp})
print("-".repeat(120))

var docs = find (d in DocProdDocument_CG.DocPrintRequest_CG where d.PolicyPeriod == pp)
for (d in docs) {
  print("  ${typeof d} " +  {d.DocProdDocumentCodes_CG.DocumentCode_CG })
//  print(d.DocProdDocumentCodes_CG.DocumentCode_CG)
}

var formsToUse = pp.Forms
var formsDiffItems = pp.FormsDiffItems

print("-".repeat(120))

print( formsToUse)

//      o(StringUtils.rightPad("--{ PatternCode: ${form.Pattern.Code}, FormNumber: ${form.Pattern.FormNumber}, Class: ${ic} }", 120, "-"))
//      if (form.Pattern.Code == "FADDINT113") {
//        print("*".repeat(120))
 




//var invalidProducts = _formPattern.Products.where(\ prod -> not prod.ProductPolicyLinePatterns.hasMatch(\ prodPattern -> prodPattern.PolicyLinePatternID == _formPattern.PolicyLinePatternCode))
//print(invalidProducts)


// TODO: Learn to use Query API
//var qDocs = Query.make(DocProdPrintRequest_CG)
//qDocs.join("DocCreationRequests")
//print(qDocs)

