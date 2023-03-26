export interface transactionDetail {
  transaction_id: any;
    name: string;
    userId: string;
    email:  String;
    phone: String;
    amount:  Number;
    currency: {
        type: String,
        required: [true, "currency is required"],
        enum: ["NGN", "USD", "EUR", "GBP"],
      };
      paymentStatus: {
        type: String,
        enum: ["successful", "pending", "failed"],
        default: "pending",
      };
      paymentGateway: {
        type: String,
        required: [true, "payment gateway is required"],
        enum: ["flutterwave"], // Payment gateway might differs as the application grows
      };
      
        timestamps: true,
      

  }
