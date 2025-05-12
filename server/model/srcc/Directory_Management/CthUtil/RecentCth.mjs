import mongoose from "mongoose";

const RecentChtSchema = new mongoose.Schema({
  hs_code: { type: String},
  level: { type: String },
  item_description: { type: String },
  unit: { type: String },
  basic_duty_sch: { type: String },
  basic_duty_ntfn: { type: String },
  specific_duty_rs: { type: String },
  igst: { type: String },
  sws_10_percent: { type: String },
  total_duty_with_sws: { type: String },
  total_duty_specific: { type: String },
  pref_duty_a: { type: String },
  import_policy: { type: String },
  non_tariff_barriers: { type: String },
  export_policy: { type: String },
    remark: { type: String },
  favourite: { type: Boolean, default: false },
  //  job: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Job",
  //       index: true,
  //     },
}, { timestamps: true });


const RecentModel = new mongoose.model("Recent", RecentChtSchema);
export default RecentModel
