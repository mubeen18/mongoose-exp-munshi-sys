
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


function emailFormat(value){
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) ?  true : false; 
}
function toLower (str) {
    return str.toLowerCase();
}

const authentication = new Schema(
    {
        email: {
            type: String, 
            unique: true, 
            required: true,
            validate: [emailFormat, "Email format Invalid!"],
            set: toLower
        },
        password: String,
        createdAt: String,
        updatedAt: String,
        status: { type: Boolean, default:false},
        token: String,	
    }, { _id: false }
)

const eventSchema = new Schema(
    {
        title: String,
        totalAmount: Number,
        pendingAmount: Number,
        paidAmount: Number,
        date: Date,
        paymentStatus: String,
    }
)

const expenseSchema = new Schema(
    {
        title: String,
        amount: String,
        date: Date,
        paymentBy: String,
        description: String,
    }
)

const userSchema = new Schema(
    {
        status:String,
        name: {
            type: String,  
            required: true
        },
        email: {
            type: String,
            set: toLower,
        },
        phone:String,
        dateOfBirth:Date,
        events: [eventSchema],
        auth: authentication,
    },
)

const departmentSchema = new Schema(
    {
        expense: [expenseSchema],
        user: [userSchema],
    }, { _id: false }
)

const munshiSchema = new Schema({
    department: {
        type: String,  
        required: true
    },
    data: departmentSchema
})

module.exports = mongoose.model('Munshi',munshiSchema);