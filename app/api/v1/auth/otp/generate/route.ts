import { NextResponse } from "next/server"
import speakeasy from "speakeasy"
import twilio from "twilio"
import qrcode from "qrcode"
import prisma from "@/lib/db"

const accountSid =
  process.env.TWILIO_ACCOUNT_SID || "AC282af83e45ec1f0ef7e1a38dc9f42fa8"
const authToken =
  process.env.TWILIO_AUTH_TOKEN || "8d1b5822ab258f5978110e825cbf53ce"
const twilioNumber = process.env.TWILIO_NUMBER || "+16203494370"

const client = new twilio(accountSid, authToken)

interface bodyProps {
  user_id: string
  email: string
  phone?: string
  type?: "message" | "call" | "qr_code" | "email"
}

export async function POST(req: Request, res: Response) {
  const {
    phone,
    email,
    user_id,
    type = "message",
  }: bodyProps = await req.json()

  const url = new URL(req.url)

  if (!email || !user_id) {
    return NextResponse.json(
      {
        message: `Email and User id required`,
      },
      { status: 400 }
    )
  }

  if ((type === "message" || type === "call") && !phone) {
    return NextResponse.json(
      {
        message: `Phone number is  required`,
      },
      { status: 400 }
    )
  }

  try {
    // Generate a new OTP secret
    var secret = speakeasy.generateSecret({ name: "TLFM" })

    var otp_code = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    })

    const otpauthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: "TLFM",
      issuer: email,
    })

    // Create a QR code for the otpauth URL
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)

    await prisma.otp.deleteMany({ where: { user_id } })

    // Store the OTP code and secret in the database
    await prisma.otp.create({
      data: {
        user_id,
        secret: secret.base32,
      },
    })

    if (type === "message") {
      // Send the OTP code and QR code via SMS
      await client.messages.create({
        body: `Your one-time verification code is ${otp_code}.\n\n@${url.hostname} #${otp_code}`,
        from: twilioNumber,
        to: phone,
        // mediaUrl: ["https://demo.twilio.com/owl.png"],
      })
    }

    if (type === "call") {
      // Send the OTP code and QR code via SMS
      await client.calls.create({
        from: twilioNumber,
        body: `Your one-time verification code is ${otp_code}. @${url.hostname} #${otp_code}`,
        to: phone,
        url: "http://demo.twilio.com/docs/voice.xml",
      })
    }

    return NextResponse.json({
      message: `OTP code generate successfully (${type})`,
      result: { secret: secret.base32, qrCodeUrl },
    })
  } catch (error) {
    console.log(error)
    NextResponse.json({ message: "Failed to send OTP code" }, { status: 500 })
  }
}

// import { NextResponse } from "next/server"
// import speakeasy from "speakeasy"
// import twilio from "twilio"
// import qrcode from "qrcode"
// import prisma from "@/lib/db"

// const accountSid =
//   process.env.TWILIO_ACCOUNT_SID || "ACe6d6afd6dace484dde67ae77a335f846"
// const authToken =
//   process.env.TWILIO_AUTH_TOKEN || "12b2dc0097807405d29bde9196ea30cd"
// const twilioNumber = "+16812216581"

// const encoding = "base32"
// const digits = 6
// const window = 30

// const client = new twilio(accountSid, authToken)

// interface bodyProps {
//   phone: string
//   user_id: string
//   email: string
//   type?: "message" | "call" | "qr_code" | "email"
// }

// export async function POST(req: Request, res: Response) {
//   const {
//     phone,
//     email,
//     user_id,
//     type = "message",
//   }: bodyProps = await req.json()

//   if (!user_id || !email || !phone) {
//     return NextResponse.json(
//       {
//         message: `email, phone, user_id required`,
//       },
//       { status: 400 }
//     )
//   }

//   // Generate a new OTP secret
//   var secret = speakeasy.generateSecret({ length: 20 })

//   var otp_code = speakeasy.totp({
//     secret: secret.base32,
//     encoding,
//     digits,
//     window,
//   })
//   console.log("🚀 ~ file: route.ts:52 ~ POST ~ otp_code:", otp_code)

//   try {
//     const otpauthUrl = speakeasy.otpauthURL({
//       secret: secret.base32,
//       label: "TLFM",
//       issuer: email,
//     })

//     // Create a QR code for the otpauth URL
//     const dataURL = await qrcode.toDataURL(otpauthUrl)

//     // Store the OTP code and secret in the database
//     await prisma.otp.create({
//       data: {
//         phone,
//         user_id,
//         code: otp_code,
//         secret: secret.base32,
//         expiresAt: new Date(Date.now() + 300000).toISOString(), // OTP expires in 5 minutes
//       },
//     })

//     if (type === "message") {
//       // Send the OTP code and QR code via SMS
//       await client.messages.create({
//         body: `Your one-time verification code is ${otp_code}. Use this code to verify your account. To make it easy, scan the QR code below with your device camera and follow the instructions.`,
//         from: twilioNumber,
//         to: phone,
//         mediaUrl: ["https://demo.twilio.com/owl.png"],
//       })
//     }

//     if (type === "call") {
//       // Send the OTP code and QR code via SMS
//       await client.calls.create({
//         from: twilioNumber,
//         to: phone,
//         url: "http://demo.twilio.com/docs/voice.xml",
//       })
//     }

//     return NextResponse.json({
//       message: `OTP code sent successfully (${type})`,
//       result: dataURL,
//     })
//   } catch (error) {
//     console.log(error)
//     NextResponse.json({ message: "Failed to send OTP code" }, { status: 500 })
//   }
// }

// import { PrismaClient } from "@prisma/client";
// const accountSid =
//   process.env.TWILIO_ACCOUNT_SID || "ACe6d6afd6dace484dde67ae77a335f846";
// const authToken =
//   process.env.TWILIO_AUTH_TOKEN || "12b2dc0097807405d29bde9196ea30cd";
// const twilioNumber = "+16812216581";
// const prisma = new PrismaClient();
// const client = new twilio(accountSid, authToken);
// const app = express();

// app.use(express.json());

// const encoding = "base32";
// const digits = 6;
// const window = 30;
// // Route for sending an OTP code via SMS
// app.post("/send-otp", async (req, res) => {
//   const { phone, type = "call" } = req.body;

//   // Generate a new OTP secret
//   var secret = speakeasy.generateSecret({ length: 20 });

//   var otp_code = speakeasy.totp({
//     secret: secret.base32,
//     encoding,
//     digits,
//     window,
//   });

//   try {
//     // Store the OTP code and secret in the database
//     const otp = await prisma.otp.create({
//       data: {
//         phone,
//         code: otp_code,
//         secret: secret.base32,
//         expiresAt: new Date(Date.now() + 300000).toISOString(), // OTP expires in 5 minutes
//       },
//     });

//     const otpauthUrl = speakeasy.otpauthURL({
//       secret: secret.base32,
//       label: "TLFM",
//       issuer: "abc.gmail.com",
//     });

//     // Create a QR code for the otpauth URL
//     const dataURL = await qrcode.toDataURL(otpauthUrl);

//     if (type === "msg") {
//       // Send the OTP code and QR code via SMS
//       await client.messages.create({
//         body: `Your one-time verification code is ${otp_code}. Use this code to verify your account. To make it easy, scan the QR code below with your device camera and follow the instructions.`,
//         from: twilioNumber,
//         to: phone,
//         // mediaUrl: [dataURL],
//         mediaUrl: ["https://demo.twilio.com/owl.png"],
//       });
//     }

//     if (type === "call") {
//       // Send the OTP code and QR code via SMS
//       await client.calls.create({
//         from: twilioNumber,
//         to: phone,
//         url: "http://demo.twilio.com/docs/voice.xml",
//       });
//     }

//     return NextResponse.json({
//       message: "OTP code sent successfully",
//       qrCode: dataURL,
//     });
//   } catch (error) {
//     console.log(error);
//     NextResponse.json({ message: "Failed to send OTP code" });
//   }
// });
// // Route for verifying an OTP code
// app.post("/verify-otp", async (req, res) => {
//   const { phone, otp_code } = req.body;

//   try {
//     // Find the OTP record in the database
//     const otp = await prisma.otp.findFirst({
//       where: {
//         phone,
//       },
//       orderBy: {
//         expiresAt: "desc",
//       },
//     });

//     if (!otp) {
//       return NextResponse.status(400).json({ message: "OTP record not found" });
//     }

//     // Verify the OTP code
//     var tokenValidates = speakeasy.totp.verify({
//       secret: otp.secret,
//       token: otp_code,
//       encoding,
//       digits,
//       window,
//     });

//     if (tokenValidates) {
//       if (otp.used) {
//         return NextResponse.status(400).json({ message: "OTP is used" });
//       }
//       // Mark the OTP record as used
//       const usedOtp = await prisma.otp.update({
//         where: {
//           id: otp.id,
//         },
//         data: {
//           used: true,
//         },
//       });

//       NextResponse.json({ message: "OTP code verified successfully" });
//     } else {
//       NextResponse.status(400).json({ message: "Invalid OTP code" });
//     }
//   } catch (error) {
//     NextResponse.json({ message: "Failed to verify OTP code" });
//   }
// });

// // Generate a new OTP secret
// const secret = speakeasy.generateSecret({ length: 20 });

// Create an otpauth URL that can be used to generate a QR code
// const otpauthUrl = speakeasy.otpauthURL({
//   secret: secret.base32,
//   label: "TLFM",
//   issuer: "abc.gmail.com",
// });

// // Create a QR code for the otpauth URL
// qrcode.toDataURL(otpauthUrl, (err, dataUrl) => {
//   if (err) {
//     console.error(err);
//   } else {
//     // Print the QR code as a data URL
//     console.log(dataUrl);
//   }
// });

// app.listen(5001, () => {
//   console.log("Server is listening on port 5001");
// });
