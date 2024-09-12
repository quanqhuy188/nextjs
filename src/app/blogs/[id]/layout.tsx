import type { Metadata } from 'next';

// Định nghĩa kiểu cho props
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Hàm để tạo metadata động
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const urlApi = `http://localhost:8000/blogs/${id}`;

  try {
    // Fetch dữ liệu từ API
    const response = await fetch(urlApi);

    // Kiểm tra phản hồi từ API
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const product = await response.json();

    // Trả về metadata động
    return {
      title: product.title || 'Default Title',
      description: product.description || 'Default Description',
    };
  } catch (error) {
    // Xử lý lỗi và trả về metadata mặc định
    console.error('Error fetching metadata:', error);
    return {
      title: 'Error Title',
      description: 'Error Description',
    };
  }
}

// Component Layout đơn giản
export default function DetailBlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
