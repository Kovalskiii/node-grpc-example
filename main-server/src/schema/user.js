import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      match: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi,
    },

    // user avatars
    avatarFiles: [
      {
        fileName: {
          type: String,
          trim: true,
        },
        fileType: {
          type: String,
          trim: true,
        },
        position: {
          type: Number,
        },
        _id: false,
      },
    ],

    username: {
      type: String,
      unique: true,
      required: true,
      match: /^[a-zA-Z0-9_-]{4,19}$/,
    },

    firstName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      match: /^[A-Za-z']{1,20}$/,
    },

    lastName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      match: /^[A-Za-z']{1,20}$/,
    },

    password: {
      type: String,
      select: false,
      required: true,
    },

    countryName: {
      type: String,
      required: false,
      match: /^[A-Za-z\s]+$/,
      trim: true,
    },

    city: {
      type: String,
      required: false,
      match: /^[A-Za-z\s]+$/,
      trim: true,
    },

    state: {
      type: String,
      required: false,
      match: /^[A-Za-z\s]+$/,
      trim: true,
    },

    status: {
      type: String, // active, blocked
      default: 'active',
    },

    role: {
      type: String, // admin, user
    },
  },

  { timestamps: {}, versionKey: false }
)

export default mongoose.model('User', userSchema)
