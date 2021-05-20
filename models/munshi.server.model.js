
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const authentication = new Schema(
    {
        email: String,
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
    }, { _id: false }
)

const expenseSchema = new Schema(
    {
        title: String,
        amount: String,
        date: Date,
        paymentBy: String,
        description: String,
    }, { _id: false }
)

const userSchema = new Schema(
    {
        status:String,
        name:String,
        email:String,
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
    department: String,
    data: departmentSchema
})

module.exports = mongoose.model('Munshi',munshiSchema);