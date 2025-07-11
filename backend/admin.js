import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import uploadFeature from '@adminjs/upload';
import path from 'path';
import { fileURLToPath } from 'url';


import { ComponentLoader } from 'adminjs'; // ✅ חובה

import Product from './models/productsModel.js';
import Settlement from './models/settlement.js';
import User from './models/users.js';
import Order from './models/ordersModel.js';
import OrderItem from './models/orderItemsModel.js';
import ContactMessage from './models/contactMessageModel.js';

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AdminJS.registerAdapter(AdminJSSequelize);

const componentLoader = new ComponentLoader();
const UploadImageComponent = componentLoader.add('UploadImageComponent', path.join(__dirname, 'components/UploadImage.jsx'));

const adminJs = new AdminJS({
  rootPath: '/admin',
  componentLoader,
  resources: [
    {
  resource: Product,
  options: {
    properties: {
  image_url: {
    components: {
      edit: UploadImageComponent, // ✅ שימוש ישיר בשם שחזרת מה־add
    },
    isVisible: { list: true, edit: true, show: true },
  },
},
  },
},
    {
      resource: Settlement,
      options: {
        properties: {
          id: { isVisible: false },
          name: { label: 'שם יישוב', isTitle: true },
          district: { label: 'לשכה' },
          municipality_name: { label: 'שם מועצה' },
          is_deliverable: {
            label: 'פעיל למשלוחים',
            type: 'boolean',
            availableValues: [
              { value: true, label: 'כן' },
              { value: false, label: 'לא' },
            ],
          },
        },
        listProperties: ['name', 'district', 'municipality_name', 'is_deliverable'],
        editProperties: ['is_deliverable'],
      },
    },
    {
      resource: User,
      options: {
        properties: {
          id: { isVisible: false },
          full_name: { label: 'שם מלא' },
          email: { label: 'אימייל' },
          phone: { label: 'טלפון' },
          createdAt: { isVisible: { list: true, edit: false, show: true, filter: true } },
          updatedAt: { isVisible: { list: true, edit: false, show: true, filter: true } },
        },
        listProperties: ['full_name', 'email', 'phone'],
        editProperties: ['full_name', 'email', 'phone'],
        filterProperties: ['full_name', 'email', 'phone', 'createdAt'],
        showProperties: ['id', 'full_name', 'email', 'phone', 'createdAt', 'updatedAt'],
      },
    },
    {
      resource: Order,
      options: {
        listProperties: ['id', 'user_id', 'total_price', 'delivery_status', 'payment_status', 'created_at'],
        showProperties: ['id', 'user_id', 'full_name', 'total_price', 'delivery_status', 'payment_status', 'created_at'],
      },
    },
    {
      resource: OrderItem,
      options: {
        listProperties: ['order_id', 'product_id', 'quantity', 'price'],
      },
    },
    {
      resource: ContactMessage,
      options: {
        properties: {
          id: { isVisible: false },
          full_name: { label: 'שם מלא' },
          email: { label: 'אימייל' },
          phone: { label: 'טלפון' },
          message: { label: 'הודעה' },
          created_at: { isVisible: { list: true, edit: false, show: true, filter: true } },
        },
        listProperties: ['full_name', 'email', 'phone', 'created_at'],
        editProperties: ['full_name', 'email', 'phone', 'message'],
        filterProperties: ['full_name', 'email', 'phone', 'created_at'],
      },
    },
  ],
  branding: {
    companyName: 'חנות ירקות',
    logo: false,
  },
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
      return { email };
    }
    return null;
  },
  cookiePassword: 'session-secret',
});

export { adminJs, adminRouter };