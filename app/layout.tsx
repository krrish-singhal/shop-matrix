import "./globals.css";
import { Toaster } from "react-hot-toast";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="font-poppins antialiased overflow-x-hidden w-full">
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{
            top: 80,
            right: 20,
          }}
          toastOptions={{
            className: '',
            duration: 3000,
            style: {
              background: '#1e2875',
              color: '#fff',
              padding: '16px 24px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '500',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              maxWidth: '90vw',
              minWidth: '280px',
              wordBreak: 'break-word',
            },
            success: {
              duration: 3000,
              style: {
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#10b981',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#ef4444',
              },
            },
            loading: {
              style: {
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
};
export default RootLayout;
