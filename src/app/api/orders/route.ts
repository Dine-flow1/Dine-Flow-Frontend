import { NextRequest, NextResponse } from 'next/server';
import { OrderDetails } from '../../../types/order';

// Mock database
let orders: OrderDetails[] = [];

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Generate order ID and number
    const orderId = `order_${Date.now()}`;
    const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newOrder: OrderDetails = {
      ...orderData,
      id: orderId,
      orderNumber,
      orderTime: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 minutes from now
    };

    orders.push(newOrder);
    
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  // Filter orders by user (in real app, use proper user authentication)
  const userOrders = orders.filter(order => 
    order.status !== 'cancelled'
  ).sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime());
  
  return NextResponse.json(userOrders);
}