# Image Guidelines for Royal Edu Hub

## Team Member Images

### Optimal Specifications
- **Aspect Ratio**: 4:5 (Portrait orientation)
- **Recommended Dimensions**: 800x1000 pixels
- **File Format**: JPEG (.jpeg or .jpg)
- **File Size**: Maximum 200KB per image
- **Quality**: 85% compression for optimal balance

### Image Requirements

#### Desktop View
- Container size: 280px width minimum
- Aspect ratio maintained at 4:5
- Object-fit: cover
- Object-position: center top

#### Mobile View
- Container adapts to screen width
- Maintains 4:5 aspect ratio
- Minimum height: 280px
- Maximum width: 100% of container

### Image Optimization Tips

1. **File Size Optimization**
   - Use tools like TinyPNG or ImageOptim
   - Target file size under 200KB
   - Maintain quality at 85% compression

2. **Dimensions**
   - Source images should be 800x1000px or larger
   - Avoid upscaling smaller images
   - Crop to 4:5 ratio before upload

3. **Performance Best Practices**
   - Use lazy loading (implemented via LazyImage component)
   - Provide placeholder while loading
   - Use progressive JPEG format
   - Consider WebP format for modern browsers

### Current Implementation

- **LazyImage Component**: Handles lazy loading with intersection observer
- **CSS Optimization**: Responsive sizing with aspect-ratio property
- **Loading States**: Placeholder with icon animation
- **Error Handling**: Fallback display for failed loads

### Fixing Loading Delays

The 30-second loading delay can be caused by:

1. **Large File Sizes**: Compress images to under 200KB
2. **Network Issues**: Implement retry logic
3. **Server Response**: Optimize image serving
4. **Browser Caching**: Set proper cache headers

### Recommended Image Processing Workflow

1. **Crop**: Adjust to 4:5 aspect ratio
2. **Resize**: Scale to 800x1000px
3. **Compress**: Reduce to under 200KB
4. **Format**: Save as JPEG with 85% quality
5. **Test**: Verify loading performance

### File Naming Convention

- Use lowercase letters
- Use descriptive names (e.g., `francis.jpeg`, `dona.jpeg`)
- Avoid spaces and special characters
- Use consistent file extensions (.jpeg preferred)

### Quality Checklist

- [ ] Image is 4:5 aspect ratio
- [ ] File size is under 200KB
- [ ] Image is sharp and well-lit
- [ ] Face is clearly visible
- [ ] Professional appearance
- [ ] Consistent lighting across all team images
- [ ] Background is clean or professionally blurred

Following these guidelines will ensure fast loading times and consistent visual presentation across all devices.