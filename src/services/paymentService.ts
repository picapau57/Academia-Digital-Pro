import { Order } from '../types';

export interface PaymentIntent {
  orderId: string;
  pixKey: string;
  pixPayload: string;
  amount: number;
  qrCodeUrl?: string;
  expiresInMinutes: number;
}

export interface IPaymentService {
  name: string;
  type: 'MANUAL_PIX' | 'AUTOMATIC_MERCADOPAGO' | 'AUTOMATIC_STRIPE';
  createPaymentIntent(order: Omit<Order, 'status' | 'createdAt' | 'id'>, pixKey: string): Promise<PaymentIntent>;
  verifyPayment(orderId: string, receiptData?: string): Promise<{ success: boolean; status: Order['status']; message: string }>;
}

/**
 * Helper to generate a standardized PIX Copia e Cola EMV payload representation
 */
export function generatePixCopiaECola(pixKey: string, amount: number, receiverName: string, city: string, txId: string = 'ADP01'): string {
  // Normalized phone or key
  const cleanKey = pixKey.replace(/\D/g, '');
  const formattedAmount = amount.toFixed(2);
  
  // Standard EMV payload format for demonstration
  return `00020126580014br.gov.bcb.pix01${cleanKey.length.toString().padStart(2, '0')}${cleanKey}520400005303986540${formattedAmount.length.toString().padStart(2, '0')}${formattedAmount}5802BR59${receiverName.slice(0, 25).length.toString().padStart(2, '0')}${receiverName.slice(0, 25)}60${city.slice(0, 15).length.toString().padStart(2, '0')}${city.slice(0, 15)}62070503***6304`;
}

/**
 * Manual PIX Payment Service
 * Initial payment method: Customer sends payment via PIX, uploads receipt, 
 * order becomes PENDING_VERIFICATION, admin reviews and approves.
 */
export class ManualPIXPaymentService implements IPaymentService {
  name = 'Manual PIX Payment Service';
  type = 'MANUAL_PIX' as const;

  async createPaymentIntent(order: Omit<Order, 'status' | 'createdAt' | 'id'>, pixKey: string): Promise<PaymentIntent> {
    const orderId = `ORD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const pixPayload = generatePixCopiaECola(pixKey, order.amount, 'ACADEMIA DIGITAL PRO', 'GOIANIA', orderId);

    return {
      orderId,
      pixKey,
      pixPayload,
      amount: order.amount,
      expiresInMinutes: 120, // 2 hours
    };
  }

  async verifyPayment(orderId: string, receiptData?: string): Promise<{ success: boolean; status: Order['status']; message: string }> {
    if (!receiptData) {
      return {
        success: false,
        status: 'PENDING',
        message: 'Comprovante não anexado. Por favor envie o comprovante de pagamento.',
      };
    }
    return {
      success: true,
      status: 'PENDING',
      message: 'Comprovante recebido! Seu pedido está em análise pela equipe financeira.',
    };
  }
}

/**
 * MercadoPago PIX Service (Architecture placeholder for future webhook / API automation)
 * Can be plugged in without changing checkout UI!
 */
export class MercadoPagoPIXService implements IPaymentService {
  name = 'Mercado Pago PIX Instantâneo';
  type = 'AUTOMATIC_MERCADOPAGO' as const;

  async createPaymentIntent(order: Omit<Order, 'status' | 'createdAt' | 'id'>, pixKey: string): Promise<PaymentIntent> {
    // When enabled with backend environment credentials, this calls /api/mercadopago/create-pix
    const orderId = `ORD-MP-${Date.now()}`;
    return {
      orderId,
      pixKey,
      pixPayload: generatePixCopiaECola(pixKey, order.amount, 'ACADEMIA DIGITAL PRO', 'GOIANIA', orderId),
      amount: order.amount,
      expiresInMinutes: 30,
    };
  }

  async verifyPayment(orderId: string): Promise<{ success: boolean; status: Order['status']; message: string }> {
    // Webhook callback integration
    return {
      success: true,
      status: 'APPROVED',
      message: 'Pagamento aprovado automaticamente via Webhook Mercado Pago.',
    };
  }
}

// Current active payment provider instance
export const paymentService: IPaymentService = new ManualPIXPaymentService();
