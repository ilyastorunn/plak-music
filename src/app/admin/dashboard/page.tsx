'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/config';
import UploadForm from '@/components/admin/UploadForm';

// Supabase'den gelen User tipini import etmeye gerek yok, otomatik tanır.

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Sayfa yüklendiğinde mevcut kullanıcıyı kontrol et
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserEmail(user.email || null);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    };

    checkUser();

    // Oturum durumundaki değişiklikleri dinle (örneğin başka sekmede çıkış yaparsa)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/admin/login');
      } else if (session) {
        setUserEmail(session.user.email || null);
      }
    });

    // Component sonlandığında dinleyiciyi temizle
    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Çıkış yaparken hata oluştu:', error);
    }
    // onAuthStateChange zaten yönlendirmeyi yapacak, ama garanti olsun diye ekleyelim.
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!userEmail) {
    return null; // Yönlendirme gerçekleşirken boş ekran göster
  }

  return (
    <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Plak Music - Admin Paneli (Supabase)</h1>
                <div className='flex items-center gap-4'>
                    <span className="hidden sm:block text-sm text-gray-600">{userEmail}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-[#4B5D6C] text-white px-4 py-2 rounded-lg hover:bg-[#3A4A58] transition-colors text-sm font-medium"
                    >
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </header>

        <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <UploadForm />
            </div>
        </main>
    </div>
  );
}