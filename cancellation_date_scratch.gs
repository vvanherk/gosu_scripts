uses gw.api.productmodel.CoveragePattern
uses ca.cooperators.pc.message.EntityConverter

//SIT3
//4050012625
//1022155

//Local
//4181500571
//132093
 
var p = policy.finder.findPolicyByPolicyNumber("4181500571")
print("Policy  Info: " + p)

print(" ")

var pp=job.slicedPeriod("132093")
print("Policy Period Info: " + pp)

print(" ")

if (pp.Job.Subtype == typekey.Job.TC_CANCELLATION.Code) {
  print("Policy Period Type: " + pp.Job.Subtype)
  print(pp.EditEffectiveDate)
  print(pp.PeriodEnd)
}

print("-----------------------------")

if (pp.BasedOn.Job.Subtype == typekey.Job.TC_CANCELLATION.Code) {
  print("Policy Period BasedOn Type: " + pp.BasedOn.Job.Subtype)
  print(pp.BasedOn.EditEffectiveDate)
  print(pp.BasedOn.PeriodEnd)
}

print(" ")
print(pp.EditEffectiveDateRange)

///////////////////////////
print(" ")
print(" ")

var converter = new EntityConverter()
var periodE = converter.convertEntity(pp)

print("EditEffectiveDate - xml: " + periodE.getChild("EditEffectiveDate").Content)
print("Period End - xml: " + periodE.getChild("PeriodEnd").Content)

var basedOn = pp.BasedOn
var temptxt = basedOn.EditEffectiveDate 

periodE.getChild("PeriodEnd").setText(temptxt)

print("------adjust-----")

print("EditEffectiveDate - xml: " + periodE.getChild("EditEffectiveDate").Content)
print("Period End - xml: " + periodE.getChild("PeriodEnd").Content)



/*
gw.transaction.Transaction.runWithNewBundle(\ bundle -> {

var origPeriodEnd = pp.PeriodEnd
var tempPP=bundle.add(pp)

tempPP.setFieldValue("Locked", false)
print(tempPP.Locked)

// set date
//tempPP.setPeriodWindow(tempPP.EditEffectiveDate, tempPP.BasedOn.EditEffectiveDate)
//print(" ")
//print(tempPP.EditEffectiveDateRange)

// reset date
//tempPP.setPeriodWindow(tempPP.EditEffectiveDate, origPeriodEnd)
//print(" ")
//print(tempPP.EditEffectiveDateRange)
  }, "su")


/*
pp.AllCoverages.each(\ cov -> print({cov.PatternCode, cov.PublicID})) 

var fprop = pp.FPropLine_CG
var pprop = pp.PPropLine_CG

var eFprop:entity.FPropLine_CG
var ePprop:entity.PPropLine_CG

var ccc = pp.AllCoverages
var limitPatterns : List<CoveragePattern>

print("------------------------------------")

for ( cov in ccc) {
//  print(cov.DisplayName)
//  print(fprop.getTIVForCoverage(cov)) ???

    limitPatterns = {CoveragePattern.getByCode(cov.PatternCode)}
    
    var covLimit = fprop.getAccumulatedLimits(limitPatterns.toTypedArray())
    if(covLimit > 0)
      print("FPropLine_CG " + cov.PatternCode + " :" + covLimit)

    covLimit = pprop.getAccumulatedLimits(limitPatterns.toTypedArray())
    if(covLimit > 0)
      print("PPropLine_CG " + cov.PatternCode + " :" + covLimit)
}

//fp.getTIVForCoverage(cov)
//fp.getAccumulatedLimits(coverages)

var fptiv = fprop.TIV
print("FP TIV is " + fptiv)

var pptiv = pprop.TIV
print("PP TIV is " + pptiv)


//var coverage : PPropBuildingCov_CG = 
//     pp.AllCoverages.where(\ c ->  PPropBuildingCov_CG 

for(ppb in pp.PPropLine_CG.PPropBuildings_CG) {
  
  print("---------------")
  var printCov = ppb.covBuilding_c.DisplayName
  print(printCov) 
   
  for ( cov in ccc) {
    limitPatterns = {CoveragePattern.getByCode(cov.PatternCode)}
    
    var covLimit = ppb.getAccumulatedLimits(limitPatterns.toTypedArray())
    if(covLimit > 0)
      print(cov.PatternCode + " :" + covLimit)
  }
      
//  print(ppb.CategorizedCoverages)
  
//  var limitPatterns : List<CoveragePattern> = {CoveragePattern.getByCode("covPowerGenInterruption_h")}
//  var accLimit = ppb.getAccumulatedLimits(limitPatterns)
//  print("covPowerGenInterruption_h :" + accLimit)
    
  var ppbtiv = ppb.TIV
  var ppbc = ppb.covBuilding_c
  var cvTerms = ppbc.CovTerms
  print(cvTerms)

  print("Building TIV is: " + ppbtiv)
  
  var accumulatedLimits = cvTerms.where(\ cterm -> cterm.ModelType =="Limit").sum( \ lmt -> lmt.DerivedNumericTermValue == null? 0 :lmt.DerivedNumericTermValue )  
  print(accumulatedLimits)
  
  
  

//  print(ppb.covBuilding_c.BuildingSettlement_cTerm.OptionValue.DisplayName)
//  print(ppb.covBuilding_c.BuildingSettlement_cTerm.OptionValue.OptionCode)
//  print(ppb.covBuilding_c.BuildingSettlement_cTerm.OptionValue.Value)
//  print(ppb.covBuilding_c.BuildingSettlement_cTerm.Value)
 // print(ppb.covBuilding_c.BuildingSettlement_cTerm.Coverage)

        if( ppb.covBuilding_c.BuildingSettlement_cTerm.OptionValue.OptionCode == "OptLossSettlementAmend"){
          print("This is the droid you've been looking for")
        }
}

print("------------------------------------")
pp.Buildings_CG.each(\ b -> {
  print(b.RiskOption_CG )
})

/*
for(cov in pp.AllCoverages) {
  if(cov typeis CPropBuildingCov_CG) {
  print(cov.DisplayName)
  print(cov.PatternCode)
  for (ctc in cov.CovTerms) {
    print("value - " + ctc.ValueAsString);
  }
   }
}
*/

//print("Policy isHabPolicy = " + pp.Policy.isHabPolicy)

// BuildingAdditionalInterestDV -  Confirmation Required  - visible
//print("Policy isFarmPolicy = " + pp.Policy.isFarmPolicy)

// BuildingAdditionalInterestDV -  Reason  - visible
//print("Policy Perion FPropLine_CG Exists = " + pp.FPropLine_CGExists)

