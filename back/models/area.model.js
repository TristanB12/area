module.exports = mongoose => {
  const areasSchema = new mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    title: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined
    },
    action: {
      type: Object,
      default: {},
      required: true,
    },
    reaction: {
      type: Object,
      default: {},
      required: true
    }
  }, { timestamps: true });

  areasSchema.method("toJSON", function () {
    const { __v, _id, createdAt, updatedAt, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Area = mongoose.model("area", areasSchema);
  return Area;
};