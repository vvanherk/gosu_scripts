//var cp = Job.slicedPeriod("4233262") //rescinded - non registered - sit3
//var cp = Job.slicedPeriod("6730720") //rescinded registered - sit3
//var pp = Job.slicedPeriod("6197114") //renewal
//var pp = Job.slicedPeriod("2756787") //cancelled - dev
//var pp = Job.slicedPeriod("4233262") //rescinded - non registered - sit3

//var pp = Job.slicedPeriod("179453") //cancelled - nsf - local
//var pp = Job.slicedPeriod("320059") //cancelling - nsf - local
//var pp = Job.slicedPeriod("246239") //cancelling - local

//var pp = Job.slicedPeriod("2123469") //cancellation - dev
//var pp = Job.slicedPeriod("160085") //cancellation - local

var pp = Job.slicedPeriod("335632")

print(pp)
print(pp.Status)

print("-".repeat(120))

var buildings = pp.InsuredItems.where(\ i -> i typeis Building)
buildings.each(\ b -> {print(b)} )

print("-".repeat(120))

pp.FarmStructures_CG.each(\ f -> {
  print(f)
  print(f.FPropBuilding_CG.InflationApplies_CG)
  })
  
print("-".repeat(120))

pp.Buildings_CG.each(\ b -> {
  print(b)
  print(b.Type)

  if(b.DwellingCovLevel_CG == b.BasedOn.DwellingCovLevel_CG) {
    print("Dwelling Coverage Level is same")
  }
  if(b.DwellingCovLevel_CG != b.BasedOn.DwellingCovLevel_CG) {
    print("Dwelling Coverage Level is CHANGED")
  }

  print(b.DwellingCovLevel_CG)
  print(b.BasedOn?.DwellingCovLevel_CG)
  print(b.PPropBuilding_CG.InflationApplies_CG)
  print(b.coverableLocation + ", " + b.RiskOption_CG.DisplayName + ", " + b.DwellingCovLevel_CG.DisplayName)

 
})

print("-".repeat(120))

var bpp = pp.BasedOn //cancelled
print(bpp)
print(bpp.Status)

print("-".repeat(120))

var bbpp = pp.BasedOn //submission
print(bbpp)
print(bbpp.Status)

//print(ReasonCode.TC_RETURNEDCHECK)

//print(ReasonCode.TC_101)

//print("-----------------------------------------\n")
//print(pp)
//print(pp.BusinessMarketContext.Code)
//print(pp.Cancellation.CancelReasonCode)
//print(pp.Cancellation.Source_CG)
//print(pp.Cancellation.CancelReasonCode.Code)
//print(pp.Cancellation.CancelReasonCode.Description)
//print(pp.Cancellation.CancellationReasons_CG)

print("\n")


