// REMOVED "use client" - Server Component required for generateMetadata
import { Metadata } from 'next';
import OrderDetails from '../../../components/order/OrderDetails';

interface OrderPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: OrderPageProps): Promise<Metadata> {
  return {
    title: `Order ${params.id} - FoodDelivery`,
    description: 'View your order details and tracking information',
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  return <OrderDetails orderId={params.id} />;
}