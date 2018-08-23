uses gw.api.database.Query
uses ca.cooperators.pc.docprod.util.FarmFormHelper
uses ca.cooperators.pc.docprod.util.FormsCollator


var _formPattern : FormPattern as Pattern

//var pp = Job.slicedPeriod("932587") // dev policy - 2 FCANC406B forms 
//var pp = Job.slicedPeriod("379393") // local policy - 2 MortgageeNotCancelJob forms policy #4181500590 
var pp = Job.slicedPeriod("270974") // local policy - 6 FCANC406 forms policy #4181500592 




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

print("Forms to use:")
print( formsToUse)

//      o(StringUtils.rightPad("--{ PatternCode: ${form.Pattern.Code}, FormNumber: ${form.Pattern.FormNumber}, Class: ${ic} }", 120, "-"))
//      if (form.Pattern.Code == "FADDINT113") {
//        print("*".repeat(120))
 
print("-".repeat(120))

var fc1:FormsCollator
var fc2:FormsCollator

formsToUse.each(\ f -> { 
    if(f.FormPatternCode == "FCANC406") {
     fc1 = FarmFormHelper.getMortgageLetterForms(pp, f)
     fc2 = FarmFormHelper.getMortgageLetterForms_old(pp, f)
     
     print("fc1 new key - " + fc1.Keys)
     print("fc1 new key count- " + fc1.Keys.Count)
     fc1.Keys.each(\ k ->  {
       var map1 = fc1.getMap(k)
       print("key is :" + k + " - " + map1)
       })

//     print("fc2 old key - " + fc2.Keys)
//     print("fc2 old key count- " + fc2.Keys.Count)
//     var map2 = fc2.getMap(fc2.Keys.first())
//     print("fc2 old map " + map2)

     print("-".repeat(120))
    }
  })


     print("-".repeat(120))
     print("-".repeat(120))

  var fcArray1 = FarmFormHelper.getMortgageLetterFormsArray(formsToUse)
  print(fcArray1)
  fcArray1.each(\ fc -> {
     print("fc new keys - " + fc.Keys)
     print("fc new key count- " + fc.Keys.Count)
     fc.Keys.each(\ k ->  {
       var map1 = fc.getMap(k)
       print("key is :" + k + " - " + map1)
       })
  })

     print("-".repeat(120))

//  var fcArray2 = FarmFormHelper.getMortgageLetterFormsArray_old(formsToUse)
//  print(fcArray2)
//  fcArray2.each(\ fc -> {
//     print("fc old key - " + fc.Keys)
//     print("fc old key count- " + fc.Keys.Count)
//     var map1 = fc.getMap(fc.Keys.first())
//     print("fc old map " + map1)
//  })
     
     
     
     
