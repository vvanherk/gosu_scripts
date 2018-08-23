uses ca.cooperators.pc.docprod.printrequest.farm.FARM_IssuedCancellationHandler
uses org.apache.commons.lang.StringUtils
uses java.lang.StringBuilder
uses gw.api.util.DisplayableException
uses ca.cooperators.pc.docprod.util.FormsCollator
uses pcf.PartitionedIndexesByTable
uses gw.api.admin.FormPatternUtil
uses java.util.Map
uses gw.testharness.TestBase
uses ca.cooperators.pc.docprod.printrequest.IssuedCancellationHandler


var RESCIND_LIST : java.util.List<String>  = {"FPREM720", "FPREM201", "FPREM203A", "FPREM319", "FCANC700"}

var pperiod = Job.slicedPeriod('4233262') //rescinded - non registered - sit3
//var pperiod = Job.slicedPeriod('4181500574') //cancelled - FMORT100 - local
//var pperiod = Job.slicedPeriod('179453') //cancelled - local

 
print (pperiod)
print (pperiod.Status)

var isvValidRescind = new TestHandler().validRescind(pperiod)
print(isvValidRescind)

class TestHandler extends FARM_IssuedCancellationHandler {

  
  function validRescind(period : PolicyPeriod) : boolean {
    var retVal = false;
    var formsByGroup = formsToUse(period).partition(\ f ->f.Pattern.GroupCode)

    formsByGroup.eachKeyAndValue(\ group, forms ->{
      var recipientType : typekey.RecipientType_CG = typekey.RecipientType_CG.TC_PH
      var fd = new FormsCollator(forms)

      fd.Keys.each(\ key ->{
        var fdForms = fd.getMap(key)
        var fdForm = fdForms.first()
        var documentCode = determineDocProdDocumentCode(period, recipientType, fdForm)
        
        print(documentCode.DocumentCode_CG)

        RESCIND_LIST.each(\ dpc ->{
          if(dpc.equalsIgnoreCase(documentCode.DocumentCode_CG)) {
            print("true")
            retVal = true
        }})
      })
    })
    return retVal
  }
}