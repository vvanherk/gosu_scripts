uses gw.api.database.Query
uses ca.cooperators.pc.docprod.util.FormsCollator
uses ca.cooperators.pc.docprod.util.ConsolidateMortgageeFormsCollator


var _formPattern : FormPattern as Pattern

var pp = Job.slicedPeriod("2174588")
var p = pp.Policy

print({pp})
print("-".repeat(120))

var docs = find (d in DocProdDocument_CG.DocPrintRequest_CG where d.PolicyPeriod == pp)
for (d in docs) {
  print("  ${typeof d} " +  {d.DocProdDocumentCodes_CG.DocumentCode_CG })
//  print(d.DocProdDocumentCodes_CG.DocumentCode_CG)
}

var key:String
var id:String = 'null'
var fd:FormsCollator
var formsToUse = pp.Forms
var form:Form = formsToUse.first()

print("-".repeat(120))

var mortgageeNoteForms = formsToUse.where(\ f -> f.Pattern.Code == "MortgageeNotSubmission" or f.Pattern.Code == "MortgageeNotRescind")
if ( mortgageeNoteForms.Count >0 ) {
  fd = new ConsolidateMortgageeFormsCollator( mortgageeNoteForms ) 
  //if( fd typeis ConsolidateMortgageeFormsCollator)
          fd.makeFormKey(form)
}
else {
  fd = new FormsCollator( pp.Forms.where(\ f -> f.Pattern.GroupCode == form.Pattern.GroupCode).subtract(mortgageeNoteForms) )
  key = form.PublicID
}





//      o(StringUtils.rightPad("--{ PatternCode: ${form.Pattern.Code}, FormNumber: ${form.Pattern.FormNumber}, Class: ${ic} }", 120, "-"))
//      if (form.Pattern.Code == "FADDINT113") {
//        print("*".repeat(120))
 




//var invalidProducts = _formPattern.Products.where(\ prod -> not prod.ProductPolicyLinePatterns.hasMatch(\ prodPattern -> prodPattern.PolicyLinePatternID == _formPattern.PolicyLinePatternCode))
//print(invalidProducts)


// TODO: Learn to use Query API
//var qDocs = Query.make(DocProdPrintRequest_CG)
//qDocs.join("DocCreationRequests")
//print(qDocs)

