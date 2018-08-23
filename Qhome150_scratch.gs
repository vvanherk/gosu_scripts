//var cp = Job.slicedPeriod("4233262") //rescinded - non registered - sit3
//var cp = Job.slicedPeriod("6730720") //rescinded registered - sit3
//var pp = Job.slicedPeriod("6197114") //renewal
//var pp = Job.slicedPeriod("2756787") //cancelled - dev
//var pp = Job.slicedPeriod("4233262") //rescinded - non registered - sit3

//var pp = Job.slicedPeriod("179453") //cancelled - nsf - local
//var pp = Job.slicedPeriod("320059") //cancelling - nsf - local
//var pp = Job.slicedPeriod("246239") //cancelling - local

//var pp = Job.slicedPeriod("2123469") //cancellation - dev

var pp = Job.slicedPeriod("100800") //cancellation - local


print(pp)
print(pp.Status)

var bpp = pp.BasedOn //cancelled
print(bpp)
print(bpp.Status)

var bbpp = pp.BasedOn //submission
print(bbpp)
print(bbpp.Status)

//print(ReasonCode.TC_RETURNEDCHECK)

//print(ReasonCode.TC_101)

print("-----------------------------------------\n")
print(pp)
print(pp.BusinessMarketContext.Code)
print(pp.Cancellation.CancelReasonCode)
print(pp.Cancellation.Source_CG)
print(pp.Cancellation.CancelReasonCode.Code)
print(pp.Cancellation.CancelReasonCode.Description)
print(pp.Cancellation.CancellationReasons_CG)

print("\n")


