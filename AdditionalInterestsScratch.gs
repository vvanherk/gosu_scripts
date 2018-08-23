var pp=job.slicedPeriod("144373")

print("Policy Period Info: " + pp)

print("Policy isHabPolicy = " + pp.Policy.isHabPolicy)

// BuildingAdditionalInterestDV -  Confirmation Required  - visible
print("Policy isFarmPolicy = " + pp.Policy.isFarmPolicy)

// BuildingAdditionalInterestDV -  Reason  - visible
print("Policy Perion FPropLine_CG Exists = " + pp.FPropLine_CGExists)

