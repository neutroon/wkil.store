import { SIGN_IN_URL, SIGN_UP_URL, SUPPORT_WHATSAPP_URL } from '@/lib/site';
import type { Content } from './types';

/**
 * The page in English: the same claims as ./ar.ts in plain English, not a word-for-word
 * translation. Every claim is backed by docs/product-facts.md; prices only through the
 * placeholders (see ./types.ts).
 */

const START = 'Open your store';

export const en: Content = {
  meta: {
    title: 'Wkil Store | Cash-on-delivery stores with no subscription',
    description:
      'Open an online store in Egypt with no subscription: {perOrder} for each order placed, never more than {cap} a month. Delivery prices for every governorate, ready, and landing pages for your ads.',
    ogTitle: 'Wkil Store: no subscription, you pay when an order comes in',
    ogDescription: '{perOrder} an order, never more than {cap} a month. A store ready for cash on delivery in Egypt.',
  },

  nav: {
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Questions', href: '#faq' },
    ],
    signIn: 'Sign in',
    cta: START,
    otherLanguage: 'العربية',
    skipToContent: 'Skip to content',
    navLabel: 'Main',
  },

  hero: {
    eyebrow: 'Wkil Store, for merchants in Egypt',
    title: 'No subscription. You pay when an order comes in.',
    lede: '{perOrder} for each order placed in your store, and never more than {cap} a month, however many orders you get. Your store opens ready for cash on delivery, with a delivery price for every governorate, and you can build landing pages for your ads.',
    primaryCta: START,
    secondaryCta: 'Work out your bill',
    note: 'Sign up with a mobile number on WhatsApp. No card, no subscription.',
    visual: {
      shopName: 'Cotton House',
      productName: 'Plain cotton t-shirt',
      productPrice: 350,
      deliveryPrice: 50,
      orderButton: 'Add to cart',
      orderLabel: 'Order #1042',
      governorate: 'Giza',
      cashOnDelivery: 'Cash on delivery',
      newOrder: 'New',
    },
  },

  steps: {
    id: 'how',
    eyebrow: 'How it works',
    title: 'From your mobile number to your first order, in three steps',
    lede: 'No email, no password, no plan to pick.',
    items: [
      {
        title: 'Sign up with your mobile',
        body: 'Type your number and we send you a code on WhatsApp. First time? Your account is created right there.',
      },
      {
        title: 'Your store comes ready',
        body: 'Pick a store name and its link. It starts with a delivery price for every governorate and About, Shipping, Returns and Contact pages, and stays a draft until you publish.',
      },
      {
        title: 'Add products and start selling',
        body: 'Add a product with a name and a price, then publish. Share the link with your customers, or point your ads at a landing page.',
      },
    ],
  },

  features: {
    id: 'features',
    eyebrow: 'Features',
    title: 'What a cash-on-delivery seller needs, ready on day one',
    lede: 'From the ad to the order: the landing page, the order form, abandoned checkouts and Meta tracking.',
    rows: [
      {
        key: 'checkout',
        eyebrow: 'Order form',
        title: 'An order form made for cash on delivery in Egypt',
        body: 'Customers order without an account: name, mobile number, governorate, address. Delivery is priced by governorate on its own, and they pay when the parcel arrives.',
        points: [
          "A delivery price per governorate; switch off the ones you don't ship to",
          'No delivery charge on orders above an amount you set',
          'Quantity offers, like two pieces for EGP 600',
          'A retried order is never placed twice',
        ],
        visual: {
          name: 'Name',
          nameValue: 'Mona Adel',
          phone: 'Mobile number',
          phoneValue: '010 1234 5678',
          governorate: 'Cairo',
          deliveryPrice: '50',
          total: 'Total',
          cod: 'Cash on delivery',
          placeOrder: 'Order now',
        },
      },
      {
        key: 'landing',
        eyebrow: 'Landing pages',
        title: 'A landing page for every ad, with the order form on it',
        body: 'Build a page for one product and point your ad at it: photos, video, features, questions, quotes from your customers, and the order form on the same page. Every order is tagged with the page it came from.',
        points: [
          'Quantity offers and a countdown to a date you set',
          'Its own Meta Pixel if you want one',
          'Its own delivery price',
          'Up to 200 landing pages per store',
        ],
        visual: {
          adLabel: 'Sponsored',
          pageTitle: 'The plain cotton t-shirt',
          offerLabel: 'Two-piece offer',
          offerPrice: '600',
          countdown: 'Offer ends in',
        },
      },
      {
        key: 'recover',
        eyebrow: 'Abandoned checkouts and tracking',
        title: "Reach the people who started an order and didn't finish",
        body: 'When someone types their mobile number in the order form and leaves, they show up in your abandoned checkouts with what was in their cart. Call them or message them on WhatsApp in one tap, and turn the cart into an order.',
        points: [
          'Abandoned checkouts are kept for 90 days',
          'Pixel and Conversions API with no code: paste your access token once',
          'Each purchase reaches Meta once, from browser and server',
          'Meta only for now: no TikTok or Snapchat',
        ],
        visual: {
          title: 'Abandoned checkouts',
          customerName: 'Mona Adel',
          whatsapp: 'WhatsApp',
          call: 'Call',
          makeOrder: 'Convert to order',
          pixelEvent: 'InitiateCheckout',
        },
      },
      {
        key: 'assistant',
        eyebrow: 'Connect an AI assistant',
        title: 'Ask your assistant to build the landing page',
        body: 'If you use an assistant like Claude or ChatGPT, give it your store\'s MCP address from the Admin Panel, approve it, and choose what it may do and for how long. Then ask it to add products, build a landing page or update your orders.',
        points: [
          'You choose what it may do, and for how long',
          'See every call it made, and disconnect it in one click',
          "It can't change settings or billing, or delete orders",
          'You bring the assistant; it connects over MCP',
        ],
        visual: {
          prompt: 'Build a landing page for the cotton t-shirt with a two-piece offer at EGP 600',
          reply: 'The landing page is ready. Review it in your Admin Panel and publish it.',
          toolLabel: 'Create landing page',
        },
      },
    ],
  },

  grid: {
    title: 'And the rest of what you use every day',
    lede: 'No higher plans: every store gets the same features.',
    soonLabel: 'Soon',
    items: [
      {
        icon: 'printer',
        title: 'Orders and printing',
        body: 'Follow every order from New to Delivered, update up to 100 at once, and print them on A4.',
      },
      {
        icon: 'layers',
        title: 'Categories',
        body: 'Group your products into categories; one product can sit in several.',
      },
      {
        icon: 'cart',
        title: 'Your name, not ours',
        body: 'No platform name or logo anywhere on your store. Customers see your name and your logo only.',
      },
      {
        icon: 'zap',
        title: 'Light on phones',
        body: 'Pages are served from a cache and refresh as soon as you change something; photos come in small sizes for phones.',
      },
      {
        icon: 'target',
        title: 'Search engines (SEO)',
        body: 'Sitemap, canonical links, share previews and product data, set up without you touching a thing.',
      },
      {
        icon: 'shield',
        title: 'Each store sealed off',
        body: "Your store's data is kept apart from every other store's inside the database itself, and there's no password to steal.",
      },
      {
        icon: 'phone',
        title: 'Your Admin Panel on your phone',
        body: 'In Arabic, made for phones, with a dark mode.',
      },
      {
        icon: 'globe',
        title: 'Your own domain',
        body: "Connect a domain you own, with the security certificate issued for you, at no extra fee. Not open yet.",
        soon: true,
      },
      {
        icon: 'whatsapp',
        title: 'Order confirmation on WhatsApp',
        body: "Wkil, a separate WhatsApp product with its own account, confirms each new order with the customer and updates it in your store. The connection isn't open yet.",
        soon: true,
      },
    ],
  },

  pricing: {
    id: 'pricing',
    eyebrow: 'Pricing',
    title: 'One price per order, and a monthly cap',
    lede: 'No subscription, no plans. A month with no orders costs you nothing.',
    perOrderLabel: 'per order a customer places',
    capLabel: 'and never more than {cap} a month',
    points: [
      'No subscription and nothing to pay to open a store',
      'Every feature for every store, no plans',
      'Unlimited products',
      'One bill a month, in Egyptian pounds',
    ],
    calculator: {
      title: 'Work out your bill',
      ordersLabel: 'Orders a month',
      ordersUnit: 'a month',
      resultLabel: 'You pay',
      cappedNote: "You've reached the cap: orders after the first {capOrders} in a month don't add to your bill.",
      averageLabel: 'Average per order',
    },
    cancellationNote:
      "An order counts the moment it's placed, confirmed or not, delivered or not. Cancel it yourself within {cancelDays} days and it isn't charged, up to {cancelPercent} of the month's orders, rounded up. Cancellations beyond that, or later than {cancelDays} days, are charged. A parcel refused at the door is an order you cancel, so the same rule applies.",
    finePrint:
      "Prices include VAT. You get one bill a month, after the month ends. Paying it online isn't open yet; until it is, our support team helps you pay over WhatsApp at {supportPhone}.",
    cta: START,
  },

  moving: {
    eyebrow: 'Coming from another platform?',
    title: "Move your store, and pay nothing while you're setting it up",
    body: "There's no automatic import from other platforms yet, so you add your products yourself, or ask your connected assistant to. Your store stays a draft until you publish it, and a draft takes no orders, so there are no fees.",
    points: [
      'Your store is a draft until you publish it: no orders, no fees',
      'A month with no orders has no bill',
      'Add your products yourself or with your assistant',
    ],
  },

  faq: {
    id: 'faq',
    eyebrow: 'Questions',
    title: 'What merchants ask us, answered plainly',
    items: [
      {
        q: 'What exactly will I pay?',
        a: '{perOrder} for each order placed in your store, VAT included, and never more than {cap} a month however many orders you get. No subscription, no fee to open a store, no plans. A month with no orders has no bill.',
      },
      {
        q: 'Which orders are charged?',
        a: "Every order a customer places in your store or on a landing page, the moment it's placed, whether you confirm it or not. An abandoned checkout you turn into an order counts too, and so does a fake or duplicate order. While your store is a draft it takes no orders, so nothing is charged.",
      },
      {
        q: 'What about cancelled orders, or a parcel the customer refuses?',
        a: "Orders you cancel within {cancelDays} days of placing aren't charged, up to {cancelPercent} of the month's orders, rounded up. Beyond that, or after {cancelDays} days, they are. There's no separate \"returned\" status: a parcel refused at the door is an order you cancel, so the same rule applies.",
      },
      {
        q: 'Can my customers pay by card or mobile wallet?',
        a: "No. For now it's cash on delivery only, and we won't promise a date for online payment until it's ready.",
      },
      {
        q: 'Can I use my own domain?',
        a: "Not yet. Custom domains are built and included at no extra fee, but they aren't open yet. Until then your store lives at its own address on wkil.store.",
      },
      {
        q: 'How do I pay you?',
        a: "One bill in Egyptian pounds after each month ends, with no balance to top up in advance. Paying the bill online isn't open yet; until it is, our support team helps you pay over WhatsApp at {supportPhone}. If a bill stays unpaid for 14 days your Admin Panel becomes read-only, and after 21 days your store closes to customers until it's paid.",
      },
      {
        q: 'I already have a store elsewhere. How do I move?',
        a: "There's no automatic import from other platforms yet: you open your store and add your products yourself, or ask your connected assistant to. Your store stays a draft until you publish it, so you pay nothing while you set it up.",
      },
      {
        q: 'Do I need a WhatsApp order-confirmation service?',
        a: "No, your store works without one. Wkil, which confirms orders on WhatsApp, is a separate product with its own account, and connecting it isn't open yet. Once it is, an order the customer cancels themselves on WhatsApp within {cancelDays} days won't be charged to you.",
      },
      {
        q: 'Can I try it before I pay anything?',
        a: "Opening a store costs nothing, and you can set it up and preview it with its preview password before you publish. The first thing you pay for is your first order after publishing.",
      },
    ],
  },

  closing: {
    title: 'Open your store today. Pay when orders come in.',
    lede: '{perOrder} an order, never more than {cap} a month.',
    cta: START,
    note: 'With a mobile number on WhatsApp. No card.',
  },

  footer: {
    tagline: 'Wkil Store: cash-on-delivery online stores for merchants in Egypt.',
    columns: [
      {
        title: 'This page',
        links: [
          { label: 'How it works', href: '#how' },
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Questions', href: '#faq' },
        ],
      },
      {
        title: 'Your account',
        links: [
          { label: 'Sign in', href: SIGN_IN_URL },
          { label: START, href: SIGN_UP_URL },
        ],
      },
      {
        title: 'Support',
        links: [{ label: 'WhatsApp {supportPhone}', href: SUPPORT_WHATSAPP_URL }],
      },
    ],
    copyright: '© {year} Wkil Store',
  },
};
