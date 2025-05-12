import { describe, it, expect } from '@jest/globals'

import { slugify } from './utils'

describe('Utils', () => {
  describe('slugify function', () => {
    it('should convert strings to URL-friendly slugs', () => {
      // Test basic functionality
      expect(slugify('Hello World')).toBe('hello-world')

      // Test with special characters
      expect(slugify('Special! @#$ Characters')).toBe('special-characters')

      // Test with leading/trailing spaces
      expect(slugify('  Trim Spaces  ')).toBe('trim-spaces')

      // Test with diacritical marks
      expect(slugify('Café Açaí')).toBe('cafe-acai')

      // Test with multiple spaces and special chars
      expect(slugify('Multiple   Spaces & Chars!')).toBe(
        'multiple-spaces-chars',
      )

      // Test with leading and trailing dashes
      expect(slugify('-leading-and-trailing-')).toBe('leading-and-trailing')
    })
  })
})
