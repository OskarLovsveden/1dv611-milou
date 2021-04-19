import mongoose, { Document, Model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
const { isEmail } = validator;

export interface IUser extends Document {
    email: string
    password: string
    domainIds: Array<string>
}

export interface IUserModel extends Model<IUser> {
    getById(id: number) : Promise<IUser>
}

export const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, '{VALUE} is not a valid email address.']
    },
    password: {
        type: String,
        minlength: [10, 'The password must be of minimum length 10 characters.'],
        required: true
    },
    domainIds: {
        type: Array,
    },

    
}, {
    timestamps: true
});

schema.pre<IUser>('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', schema);

export default User;
