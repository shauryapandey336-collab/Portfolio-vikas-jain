'use client';
import { useState, useCallback } from 'react';
import { saveImage, getImage, deleteImage as removeImage } from '@/lib/indexedDB';
import { generateId } from '@/lib/utils';

export function useImageStorage() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = useCallback(async (file, customId) => {
    setUploading(true);
    try {
      const id = customId || `img_${generateId()}`;
      const dataUrl = await saveImage(id, file);
      return { id, dataUrl };
    } finally {
      setUploading(false);
    }
  }, []);

  const loadImage = useCallback(async (id) => {
    return getImage(id);
  }, []);

  const deleteImage = useCallback(async (id) => {
    await removeImage(id);
  }, []);

  return { uploadImage, loadImage, deleteImage, uploading };
}
