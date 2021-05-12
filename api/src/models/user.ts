import mongoose, { Document, Model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import Page from './page';
import createHttpError from 'http-errors';

const { isEmail } = validator;

export interface IUser extends Document {
    email: string
    password: string
}

export interface IUserModel extends Model<IUser> {
    authenticate(email: string, password: string): Promise<IUser>
    findUserEmailsFromIDS(userIDS: string[]): Promise<string[]>
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
}, {
    timestamps: true
});

schema.pre<IUser>('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

schema.statics.authenticate = async function(email: string, password: string): Promise<void> {
    const user = await this.findOne({ email });

    if(!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }
};

schema.statics.findUserEmailsFromIDS = async function(userIDS: string[]): Promise<string[]> {
    try {
        const userEmails = [];

        for (const userID of userIDS) {
            const user = await User.findOne({_id: userID});
            if (user) {
                userEmails.push(user?.email);
            }
        }
        return userEmails;
    } catch (error) {
        throw createHttpError(400, 'Failed to find user emails');
    }
};



const User: IUserModel = mongoose.model<IUser, IUserModel>('User', schema);

export default User;
