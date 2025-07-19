"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/config";

interface Genre {
  id: string;
  name: string;
}

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [songFile, setSongFile] = useState<File | null>(null);

  const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [newGenre, setNewGenre] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const { data: genres, error } = await supabase
        .from("genres")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) {
        console.error("Türler çekilirken hata oluştu:", error);
      } else {
        setAvailableGenres(genres);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreCheckboxChange = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleAddNewGenre = async () => {
    if (!newGenre.trim()) return;
    const formattedGenre = newGenre.trim();

    if (
      availableGenres.some(
        (g) => g.name.toLowerCase() === formattedGenre.toLowerCase()
      )
    ) {
      setError(`"${formattedGenre}" adında bir tür zaten mevcut.`);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("genres")
        .insert({ name: formattedGenre })
        .select()
        .single();

      if (error) throw error;

      setAvailableGenres((prev) =>
        [...prev, data].sort((a, b) => a.name.localeCompare(b.name))
      );
      setNewGenre("");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Yeni tür eklenirken bir hata oluştu.");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !artist ||
      !country ||
      !year ||
      selectedGenres.length === 0 ||
      !coverFile ||
      !songFile
    ) {
      setError("Lütfen tüm alanları doldurun ve en az bir tür seçin.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    let coverUrl, songUrl, newSongId;

    try {
      console.log("Adım 1: Kapak yükleniyor...");
      console.log("Cover file:", coverFile.name, coverFile.type, coverFile.size);
      
      // Dosya adını güvenli hale getir
      const safeFileName = coverFile.name
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, '_');
      
      // Benzersiz dosya yolu oluştur
      const coverPath = `covers/${Date.now()}_${safeFileName}`;
      
      // Önce mevcut dosyayı sil (varsa)
      try {
        await supabase.storage
          .from("covers")
          .remove([coverPath]);
      } catch (error) {
        // Dosya zaten yok, sorun değil
      }
      
      // Yeni dosyayı yükle
      const { error: coverError, data: coverData } = await supabase.storage
        .from("covers")
        .upload(coverPath, coverFile, {
          cacheControl: '3600',
          contentType: coverFile.type, // MIME type'ı belirt
          upsert: true // Üzerine yazma izni ver
        });
        
      if (coverError) throw coverError;
      
      // Public URL'i al
      const { data: { publicUrl } } = supabase.storage
        .from("covers")
        .getPublicUrl(coverPath);
      
      coverUrl = publicUrl;
      
      // URL kontrolü
      if (!coverUrl || coverUrl.includes('undefined')) {
        throw new Error('Kapak URL\'si oluşturulamadı');
      }
      
      console.log("Adım 1 BAŞARILI: Kapak URLsi:", coverUrl);
      
      // URL'nin erişilebilir olduğunu kontrol et
      const urlCheck = await fetch(coverUrl, { method: 'HEAD' });
      if (!urlCheck.ok) {
        throw new Error('Kapak dosyası erişilebilir değil');
      }
      
    } catch (err) {
      console.error("HATA ADIM 1 (Kapak Yükleme):", err);
      setError(`Hata (Kapak Yükleme): ${(err as Error).message}`);
      setIsUploading(false);
      return;
    }

    try {
      console.log("Adım 2: Şarkı yükleniyor...");
      
      // Dosya adını güvenli hale getir
      const safeFileName = songFile.name
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, '_');
      
      // Benzersiz dosya yolu oluştur
      const songPath = `songs/${Date.now()}_${safeFileName}`;
      
      // Önce mevcut dosyayı sil (varsa)
      try {
        await supabase.storage
          .from("songs")
          .remove([songPath]);
      } catch (error) {
        // Dosya zaten yok, sorun değil
      }
      
      // Yeni dosyayı yükle
      const { error: songError } = await supabase.storage
        .from("songs")
        .upload(songPath, songFile, {
          cacheControl: '3600',
          contentType: songFile.type,
          upsert: true
        });
        
      if (songError) throw songError;
      
      // Public URL'i al
      const { data: { publicUrl } } = supabase.storage
        .from("songs")
        .getPublicUrl(songPath);
      
      songUrl = publicUrl;
      
      // URL kontrolü
      if (!songUrl || songUrl.includes('undefined')) {
        throw new Error('Şarkı URL\'si oluşturulamadı');
      }
      
      console.log("Adım 2 BAŞARILI: Şarkı URLsi:", songUrl);
      
      // URL'nin erişilebilir olduğunu kontrol et
      const urlCheck = await fetch(songUrl, { method: 'HEAD' });
      if (!urlCheck.ok) {
        throw new Error('Şarkı dosyası erişilebilir değil');
      }
      
    } catch (err) {
      console.error("HATA ADIM 2 (Şarkı Yükleme):", err);
      setError(`Hata (Şarkı Yükleme): ${(err as Error).message}`);
      setIsUploading(false);
      return;
    }

    try {
      console.log("Adım 3: Şarkı veritabanına ekleniyor...");
      const { data: songData, error: songInsertError } = await supabase
        .from("songs")
        .insert({
          title,
          artist,
          country,
          year: Number(year),
          cover_url: coverUrl,
          song_url: songUrl,
        })
        .select("id")
        .single();
      if (songInsertError) throw songInsertError;
      newSongId = songData.id;
      console.log("Adım 3 BAŞARILI: Yeni şarkı IDsi:", newSongId);
    } catch (err) {
      console.error("HATA ADIM 3 (Şarkı Ekleme):", err);
      setError(`Hata (Şarkı Ekleme): ${(err as Error).message}`);
      setIsUploading(false);
      return;
    }

    // Adım 4: Tür İlişkilerini Ekleme
    try {
      console.log("Adım 4: Tür ilişkileri ekleniyor...");

      // YENİ: Olası kopyaları temizlemek için bir Set kullanıyoruz.
      const uniqueGenreIds = [...new Set(selectedGenres)];

      const songGenreRelations = uniqueGenreIds.map((genreId) => ({
        song_id: newSongId,
        genre_id: genreId,
      }));

      const { error: relationError } = await supabase
        .from("songs_genres")
        .insert(songGenreRelations);
      if (relationError) throw relationError;
      console.log("Adım 4 BAŞARILI: İlişkiler eklendi.");
    } catch (err) {
      console.error("HATA ADIM 4 (İlişki Ekleme):", err);
      setError(`Hata (İlişki Ekleme): ${(err as Error).message}`);
      setIsUploading(false);
      return;
    }

    setSuccess("Şarkı başarıyla yüklendi!");
    setTitle("");
    setArtist("");
    setCountry("");
    setYear("");
    setSelectedGenres([]);
    (document.getElementById("uploadForm") as HTMLFormElement).reset();
    setIsUploading(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Yeni Müzik Ekle</h2>
      <form id="uploadForm" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Şarkı Adı
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7521D]"
              />
            </div>
            <div>
              <label
                htmlFor="artist"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sanatçı
              </label>
              <input
                type="text"
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7521D]"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ülke
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Örn: Türkiye"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7521D]"
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Yıl
              </label>
              <input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Örn: 1978"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7521D]"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <label className="block text-base font-semibold text-gray-800 mb-3">
              Müzik Türleri
            </label>
            <div className="max-h-48 overflow-y-auto pr-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {availableGenres.map((genre) => (
                <div key={genre.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`genre-${genre.id}`}
                    value={genre.id}
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreCheckboxChange(genre.id)}
                    className="h-4 w-4 rounded border-gray-300 text-[#D7521D] focus:ring-[#D7521D]"
                  />
                  <label
                    htmlFor={`genre-${genre.id}`}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {genre.name}
                  </label>
                </div>
              ))}
            </div>
            {availableGenres.length === 0 && (
              <p className="text-sm text-gray-500">
                Mevcut tür bulunamadı. Lütfen yeni bir tane ekleyin.
              </p>
            )}
          </div>

          <div className="border-t pt-6">
            <label
              htmlFor="new-genre"
              className="block text-base font-semibold text-gray-800 mb-3"
            >
              Yeni Tür Ekle
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="new-genre"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                placeholder="Örn: Alternative Rock"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7521D]"
              />
              <button
                type="button"
                onClick={handleAddNewGenre}
                className="px-4 py-2 bg-[#4B5D6C] text-white rounded-lg hover:bg-[#3A4A58] transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Ekle
              </button>
            </div>
          </div>

          <div className="md:col-span-2 border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label
                htmlFor="cover"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Albüm Kapağı (Resim)
              </label>
              <input
                type="file"
                id="cover"
                onChange={(e) => handleFileChange(e, setCoverFile)}
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4B5D6C] file:text-white hover:file:bg-[#3A4A58] cursor-pointer"
              />
            </div>
            <div>
              <label
                htmlFor="song"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Müzik Dosyası (MP3, WAV)
              </label>
              <input
                type="file"
                id="song"
                onChange={(e) => handleFileChange(e, setSongFile)}
                accept="audio/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4B5D6C] file:text-white hover:file:bg-[#3A4A58] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          {error && (
            <p className="text-red-500 text-center text-sm mb-4">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-center text-sm mb-4">{success}</p>
          )}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-[#D7521D] text-white py-3 rounded-lg font-semibold hover:bg-[#b64518] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isUploading ? "Yükleniyor..." : "Müziği Yükle"}
          </button>
        </div>
      </form>
    </div>
  );
}
