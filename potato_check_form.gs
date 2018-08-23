var pp = Job.slicedPeriod("5481400") // dev farm vvh

//var pp = Job.slicedPeriod("107138")  // ratedev 

print(pp)

var cov = pp.FLiabLine_CG.covFLPotatoWithdrawalExpense
print(cov.PatternCode + " " + cov.DisplayName)

cov.CovTerms.each(\ ct ->{
  print("  ${ct.PatternCode} " + { ct.ValueAsString })
})
