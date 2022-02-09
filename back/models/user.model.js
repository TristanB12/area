module.exports = mongoose => {
  const usersSchema = new mongoose.Schema({
    auth: {
      auth_type: {
        type: String,
        required: true
      },
      email: {
        type: String,
        unique: true
      },
      password: {
        type: String
      },
      refreshToken: {
        type: String,
      }
    },
    email_verified: {
      type: Boolean,
      default: false
    },
    services: {
      type: Object,
      default: {},
    }
  }, { timestamps: true });

  usersSchema.method("toJSON", function () {
    const { __v, _id, createdAt, updatedAt, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", usersSchema);
  return User;
};