import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser with 10MB limit for receipt screenshot handling
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Gmail credentials
const GMAIL_USER = process.env.GMAIL_USER || 'm.adil8029777@gmail.com';
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || 'ffms seor vpmh rgch').replace(/\s+/g, '');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// API endpoint to handle order emails
app.post('/api/send-order-email', async (req, res) => {
  try {
    const { order } = req.body;

    if (!order || !order.customer) {
      return res.status(400).json({ success: false, error: 'Invalid order data' });
    }

    const {
      orderId,
      createdAt,
      items,
      subtotal,
      shippingFee,
      total,
      customer,
    } = order;

    const itemsRowsHtml = items
      .map(
        (item: any) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #F3E7C4; font-size: 14px; color: #23272F;">
            <strong>${item.product.name}</strong><br/>
            <span style="font-size: 12px; color: #7E8492;">${item.product.material}</span>
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #F3E7C4; font-size: 14px; text-align: center; color: #23272F;">
            ${item.quantity}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #F3E7C4; font-size: 14px; text-align: right; color: #23272F;">
            Rs. ${(item.product.price * item.quantity).toLocaleString()}
          </td>
        </tr>
      `
      )
      .join('');

    const paymentLabel =
      customer.paymentMethod === 'jazzcash'
        ? 'JazzCash Mobile Transfer'
        : 'Cash on Delivery (COD)';

    const screenshotHtml =
      customer.jazzCashScreenshot && customer.jazzCashScreenshot.url
        ? `
        <div style="margin-top: 20px; padding: 16px; background-color: #FFF9E6; border: 1px solid #F3E7C4; border-radius: 12px;">
          <h4 style="margin: 0 0 10px 0; color: #A9853C; font-size: 14px;">JazzCash Payment Receipt Screenshot</h4>
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #5F6572;">File Name: <strong>${customer.jazzCashScreenshot.name}</strong> (${customer.jazzCashScreenshot.size})</p>
          <img src="${customer.jazzCashScreenshot.url}" alt="JazzCash Receipt Proof" style="max-width: 100%; max-height: 400px; border-radius: 8px; border: 1px solid #E8D9B0;" />
        </div>
      `
        : '';

    // 1. Email to Admin (m.adil8029777@gmail.com)
    const adminMailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFDF5; padding: 30px; color: #23272F;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #F3E7C4; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          
          <div style="background-color: #FFF9E6; padding: 24px; border-bottom: 1px solid #F3E7C4; text-align: center;">
            <h1 style="margin: 0; font-size: 26px; color: #23272F; letter-spacing: 1px;">Aura & Co.</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #A9853C; font-weight: 600;">NEW ORDER NOTIFICATION</p>
          </div>

          <div style="padding: 24px;">
            <div style="background: #FBF9F4; border-left: 4px solid #C5A059; padding: 14px 18px; border-radius: 8px; margin-bottom: 22px;">
              <p style="margin: 0; font-size: 15px; font-weight: 600; color: #23272F;">Order Reference: ${orderId}</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #7E8492;">Received: ${createdAt}</p>
            </div>

            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #736B59; margin-bottom: 12px;">Customer Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #7E8492; width: 140px;">Customer Name:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #23272F;">${customer.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #7E8492;">Email:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #23272F;">${customer.email || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #7E8492;">Phone / WhatsApp:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #23272F;">${customer.phone}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #7E8492;">Shipping Address:</td>
                <td style="padding: 6px 0; color: #23272F;">${customer.address}, ${customer.city}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #7E8492;">Payment Method:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #A9853C;">${paymentLabel}</td>
              </tr>
              ${customer.jazzCashTid ? `
              <tr>
                <td style="padding: 6px 0; color: #7E8492;">JazzCash TID:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #23272F;">${customer.jazzCashTid}</td>
              </tr>` : ''}
              ${customer.orderNotes ? `
              <tr>
                <td style="padding: 6px 0; color: #7E8492;">Order Notes:</td>
                <td style="padding: 6px 0; color: #5F6572;">${customer.orderNotes}</td>
              </tr>` : ''}
            </table>

            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #736B59; margin-bottom: 12px;">Ordered Items</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #FFF9E6;">
                  <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #736B59; border-bottom: 2px solid #F3E7C4;">Item</th>
                  <th style="padding: 10px 12px; text-align: center; font-size: 12px; color: #736B59; border-bottom: 2px solid #F3E7C4;">Qty</th>
                  <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #736B59; border-bottom: 2px solid #F3E7C4;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRowsHtml}
              </tbody>
            </table>

            <div style="background-color: #FFFDF5; border: 1px solid #F3E7C4; border-radius: 12px; padding: 14px 18px; margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; color: #5F6572; margin-bottom: 6px;">
                <span>Subtotal:</span>
                <span style="font-weight: 600; color: #23272F;">Rs. ${subtotal.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; color: #5F6572; margin-bottom: 8px;">
                <span>Courier Delivery:</span>
                <span style="font-weight: 600; color: #23272F;">${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #23272F; border-top: 1px solid #F3E7C4; padding-top: 8px;">
                <span>Total Payable:</span>
                <span style="color: #A9853C;">Rs. ${total.toLocaleString()}</span>
              </div>
            </div>

            ${screenshotHtml}
          </div>

          <div style="background-color: #23272F; padding: 16px; text-align: center; color: #FFF9E6; font-size: 12px;">
            Aura & Co. E-Commerce System • Admin Alert
          </div>
        </div>
      </div>
    `;

    // 2. Email to Customer (if email is provided)
    const customerMailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFDF5; padding: 30px; color: #23272F;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #F3E7C4; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          
          <div style="background-color: #FFF9E6; padding: 28px 24px; border-bottom: 1px solid #F3E7C4; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #23272F; letter-spacing: 1px;">Aura & Co.</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #A9853C; font-weight: 600;">Elegance in every detail</p>
          </div>

          <div style="padding: 26px;">
            <h2 style="font-size: 20px; color: #23272F; margin: 0 0 10px 0;">Order Confirmed!</h2>
            <p style="font-size: 14px; color: #5F6572; line-height: 1.6; margin: 0 0 20px 0;">
              Dear <strong>${customer.fullName}</strong>,<br/>
              Thank you for choosing Aura & Co.! Your order <strong>${orderId}</strong> has been received and is being prepared in our signature luxury gift packaging.
            </p>

            <div style="background: #FFF9E6; border: 1px solid #F3E7C4; border-radius: 12px; padding: 14px 18px; margin-bottom: 22px;">
              <p style="margin: 0; font-size: 13px; color: #23272F;"><strong>Order Number:</strong> ${orderId}</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #23272F;"><strong>Delivery Time:</strong> 2 – 4 Working Days</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #23272F;"><strong>Payment Method:</strong> ${paymentLabel}</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #23272F;"><strong>Shipping to:</strong> ${customer.address}, ${customer.city}</p>
            </div>

            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #736B59; margin-bottom: 10px;">Your Ordered Items</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #FFF9E6;">
                  <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #736B59; border-bottom: 2px solid #F3E7C4;">Piece</th>
                  <th style="padding: 10px 12px; text-align: center; font-size: 12px; color: #736B59; border-bottom: 2px solid #F3E7C4;">Qty</th>
                  <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #736B59; border-bottom: 2px solid #F3E7C4;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRowsHtml}
              </tbody>
            </table>

            <div style="background-color: #FFFDF5; border: 1px solid #F3E7C4; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; color: #5F6572; margin-bottom: 6px;">
                <span>Subtotal:</span>
                <span style="font-weight: 600; color: #23272F;">Rs. ${subtotal.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; color: #5F6572; margin-bottom: 8px;">
                <span>Courier Shipping:</span>
                <span style="font-weight: 600; color: #23272F;">${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #23272F; border-top: 1px solid #F3E7C4; padding-top: 8px;">
                <span>Total Amount:</span>
                <span style="color: #A9853C;">Rs. ${total.toLocaleString()}</span>
              </div>
            </div>

            <p style="font-size: 13px; color: #7E8492; line-height: 1.5; margin: 0 0 16px 0;">
              Our concierge team will verify your parcel before dispatch. If you have any questions or need custom sizing, reach out to us at <strong>m.adil8029777@gmail.com</strong> or WhatsApp <strong>+92 300 1234567</strong>.
            </p>
          </div>

          <div style="background-color: #23272F; padding: 18px; text-align: center; color: #FFF9E6; font-size: 12px;">
            Aura & Co. • Lahore & Karachi, Pakistan • @aurajewelrypk
          </div>
        </div>
      </div>
    `;

    // Send email to Store Owner (m.adil8029777@gmail.com)
    await transporter.sendMail({
      from: `"Aura & Co. Store" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: `✨ New Order ${orderId} - Rs. ${total.toLocaleString()} (${customer.fullName})`,
      html: adminMailHtml,
    });

    // Send confirmation email to Customer (if valid email provided)
    if (customer.email && customer.email.includes('@')) {
      await transporter.sendMail({
        from: `"Aura & Co." <${GMAIL_USER}>`,
        to: customer.email,
        subject: `Order Confirmed: ${orderId} - Aura & Co.`,
        html: customerMailHtml,
      });
    }

    res.json({
      success: true,
      message: 'Order confirmation emails sent successfully',
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    // Return 200 with error info so order completion flow in frontend is not blocked
    res.json({
      success: false,
      error: error?.message || 'Failed to send email notification',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aura & Co. server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
