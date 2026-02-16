import { useState, useEffect, useCallback } from 'react'

type FontSize = 'small' | 'medium' | 'large'
type Contrast = 'normal' | 'high'

interface AccessibilitySettings {
  fontSize: FontSize
  contrast: Contrast
}

const STORAGE_KEY = 'brb_accessibility'

function loadSettings(): AccessibilitySettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return { fontSize: 'medium', contrast: 'normal' }
}

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings)

  useEffect(() => {
    const root = document.documentElement
    if (settings.fontSize === 'medium') {
      root.removeAttribute('data-font-size')
    } else {
      root.setAttribute('data-font-size', settings.fontSize)
    }
    if (settings.contrast === 'normal') {
      root.removeAttribute('data-contrast')
    } else {
      root.setAttribute('data-contrast', settings.contrast)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const setFontSize = useCallback((fontSize: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize }))
  }, [])

  const toggleContrast = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      contrast: prev.contrast === 'normal' ? 'high' : 'normal',
    }))
  }, [])

  return { ...settings, setFontSize, toggleContrast }
}