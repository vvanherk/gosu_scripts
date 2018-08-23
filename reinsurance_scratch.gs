// RIRiskEnhancement_CG.calculateLineLimit()
// LineLimit_CG.ReinsurableType_CG - pcx_LineLimit_CG.ReinsurableType_CG
var pp = Job.slicedPeriod("195800")

pp.CPropLine_CG.CPropCommSchedules_CG.each(\ c ->{
  print(c.ReinsurableCoverable.Reinsurables*.RIRisk*.Reinsurable*.Subtype)
  c.ReinsurableCoverable.Reinsurables.each(\ r -> {
    print(r.RIRisk.Reinsurable)
    print(r.RIRisk.Reinsurable.CoverageGroup)
    print(r.RIRisk.LineLimit_CG)
    print("--------------------------")
    })
  print("asdf")
} )

