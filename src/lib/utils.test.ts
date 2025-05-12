import { describe, it, expect } from '@jest/globals'

import { slugify } from './utils'

describe('Utils', () => {
  describe('slugify function', () => {
    it('should convert strings to URL-friendly slugs', () => {
      expect(slugify('Hello World')).toBe('hello-world')

      expect(slugify('Special! @#$ Characters')).toBe('special-characters')

      expect(slugify('  Trim Spaces  ')).toBe('trim-spaces')

      expect(slugify('Café Açaí')).toBe('cafe-acai')

      expect(slugify('Multiple   Spaces & Chars!')).toBe(
        'multiple-spaces-chars',
      )

      expect(slugify('-leading-and-trailing-')).toBe('leading-and-trailing')
    })
  })
})
