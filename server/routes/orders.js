require("dotenv").config();
const express = require("express");
const Order = require("../models/OrdersAdmin");
const nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");
const router = express.Router();
// const PDFDocument = require("pdfkit");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEYS,
  api_secret: process.env.API_SECRET,
});

// const generateInvoicePDF = (order) => {
//   const doc = new PDFDocument({ margin: 20 });

//   doc.fontSize(14).text(Invoice #${order._id}, { align: "center" }).moveDown(0.5);

//   doc.fontSize(10).text(Customer: ${order.address.name});
//   doc.text(Total: ₹${order.totalAmount}).moveDown(0.5);

//   doc.fontSize(10).text("Products:", { underline: true });

//   order.products.forEach((item) => {
//     doc.text(${item.product.name} - Qty: ${item.quantity} - ₹${item.product.price});
//   });

//   doc.text("Thank you!", { align: "center" });

//   const pdfPath = invoices/invoice_${order._id}.pdf;
//   return { doc, pdfPath };
// };

/**
   *  const generateInvoicePDF = (order) => {
    const doc = new PDFDocument({ margin: 40 });
  
    // Header
    doc
      .fontSize(18)
      .text("Kashvi Sarees", { align: "center" })
      .fontSize(10)
      .text("123 Saree Street, Mumbai, India", { align: "center" })
      .text("Phone: +91 1234567890 | Email: info@kashvisarees.com", { align: "center" })
      .moveDown(1);
  
    // Invoice title
    doc
      .fontSize(14)
      .text(Invoice #${order._id}, { align: "center" })
      .moveDown(1);
  
    // Customer details
    doc
      .fontSize(10)
      .text(Customer: ${order.address.name})
      .text(Address: ${order.address.street}, ${order.address.city}, ${order.address.pincode})
      .moveDown(1);
  
    // Order summary
    doc
      .fontSize(12)
      .text(Total: ₹${order.totalAmount})
      .text(Payment: ${order.paymentMethod} (Status: ${order.paymentStatus}))
      .moveDown(1);
  
    // Products Table
    doc
      .fontSize(12)
      .text("Products Ordered", { underline: true })
      .moveDown(0.5);
  
    // Table headers
    const startY = doc.y;
    doc
      .text("Product", 50, startY)
      .text("Qty", 230, startY)
      .text("Price", 300, startY)
      .text("Total", 400, startY);
  
    let y = startY + 15;
    order.products.forEach((item) => {
      const total = item.quantity * item.product.price;
      doc
        .fontSize(10)
        .text(item.product.title, 50, y)
        .text(item.quantity.toString(), 230, y)
        .text(₹${item.product.price}, 300, y)
        .text(₹${total}, 400, y);
      y += 15;
    });
  
    // Footer
    doc
      .moveTo(50, y + 10)
      .lineTo(500, y + 10)
      .stroke()
      .fontSize(9)
      .text("Thank you for shopping with Kashvi Sarees!", 50, y + 20)
      .text("For queries, contact info@kashvisarees.com", 50, y + 35);
  
    // Finalize PDF
    const pdfPath = invoices/invoice_${order._id}.pdf;
    return { doc, pdfPath };
  };
   */

router.post("/place-order", async (req, res) => {
  try {
    const {
      userId,
      products,
      totalAmount,
      paymentMethod,
      address,
      paymentStatus,
    } = req.body;

    if (
      !userId ||
      !products ||
      products.length === 0 ||
      !totalAmount ||
      !paymentMethod ||
      !address
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newOrder = new Order({
      user: userId,
      products,
      totalAmount,
      paymentMethod,
      address,
      paymentStatus,
      orderStatus: "Pending",
    });

    await newOrder.save();
    //   const { doc, pdfPath } = generateInvoicePDF(newOrder);

    //   const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
    //     { resource_type: "raw", folder: "invoices" },
    //     async (error, result) => {
    //       if (error) {
    //         console.error("Cloudinary upload error:", error);
    //         return res.status(500).json({ error: "Failed to upload invoice." });
    //       }

    //     }
    //   );

    //   // Pipe the PDF to Cloudinary
    //   doc.pipe(cloudinaryUploadStream);

    // Send email with the PDF attachment
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "Kashvi Sarees <" + process.env.OWNER_EMAIL + ">",
      to: "navneetprajapati46@gmail.com",
      subject: "Your Order Invoice - Kashvi Sarees",
      html: `
              <h2>Thank you for your order!</h2>
              <p>Your order has been placed successfully. Below are the details:</p>
              <p><strong>Order ID:</strong> ${newOrder._id}</p>
              <p><strong>Total Amount:</strong> ₹X,XXX</p>
              <p><strong>Payment Method:</strong> ${newOrder.paymentMethod}</p>
              <p><strong>Payment Status:</strong> ${newOrder.paymentStatus}</p>
              <p>Please find the attached invoice for your reference.</p>
            `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ error: "Failed to place order." });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("user")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/admin/orders", async (req, res) => {
  try {
    const { limit = 15, page = 1 } = req.query; // Default: 15 per page, page 1
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)); // Convert limit to a number

    const totalOrders = await Order.countDocuments(); // Get total orders count

    res.json({ orders, totalOrders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.put("/admin/orders/:orderId", async (req, res) => {
  try {
    const { orderStatus, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus: orderStatus || status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }

    const order = await Order.findById(orderId).populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    console.log(order);

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/admin/order-details/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);
  const order = await Order.findById(orderId);
  res.json(order);
});

router.post("/contact", async (req, res) => {
  const { fullName, email, telephone, review } = req.body;

  if (!fullName || !email || !telephone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_LOGIN_NAVNEET,
      pass: process.env.SMTP_PASS_NAVNEET,
    },
  });

  const mailOptions = {
    from: `"Kashvi Creation" <${process.env.OWNER_EMAIL}>`,
    to: "navneetprajapati46@gmail.com",
    replyTo: email,
    subject: "📩 New Contact Form Submission",
    text: `New Contact Inquiry\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${telephone}\nMessage: ${review}`,
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #333;">📬 New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${telephone}">${telephone}</a></p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left: 4px solid #007bff; padding-left: 10px; color: #555;">
                ${review}
            </blockquote>
            <hr />
            <p style="font-size: 0.9rem; color: #777;">This message was sent from your website's contact form.</p>
        </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("success");
    res.status(200).json({ success: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
