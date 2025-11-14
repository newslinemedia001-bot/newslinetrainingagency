'use client';

import { useMemo } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface SEOAnalyzerProps {
  title: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  content: string;
  focusKeyword: string;
  onFocusKeywordChange: (keyword: string) => void;
  onSeoTitleChange: (title: string) => void;
  onMetaDescriptionChange: (desc: string) => void;
}

interface SEOCheck {
  label: string;
  passed: boolean;
  message: string;
}

export default function SEOAnalyzer({
  title,
  seoTitle,
  metaDescription,
  slug,
  content,
  focusKeyword,
  onFocusKeywordChange,
  onSeoTitleChange,
  onMetaDescriptionChange
}: SEOAnalyzerProps) {
  
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const getWordCount = (text: string) => {
    return stripHtml(text).split(/\s+/).filter(word => word.length > 0).length;
  };

  const getKeywordDensity = (text: string, keyword: string) => {
    if (!keyword) return 0;
    const cleanText = stripHtml(text).toLowerCase();
    const cleanKeyword = keyword.toLowerCase();
    const words = cleanText.split(/\s+/);
    const keywordCount = words.filter(word => word.includes(cleanKeyword)).length;
    return words.length > 0 ? (keywordCount / words.length) * 100 : 0;
  };

  const getFirstParagraph = (html: string) => {
    const match = html.match(/<p>(.*?)<\/p>/);
    return match ? stripHtml(match[0]) : stripHtml(html.substring(0, 200));
  };

  const hasHeadings = (html: string) => {
    return /<h[2-3][^>]*>/.test(html);
  };

  const hasImages = (html: string) => {
    return /<img/.test(html);
  };

  const hasLinks = (html: string) => {
    return /<a/.test(html);
  };

  const checks: SEOCheck[] = useMemo(() => {
    // Helper functions are defined above and used here
    const keyword = focusKeyword.toLowerCase();
    const cleanContent = stripHtml(content).toLowerCase();
    const firstPara = getFirstParagraph(content).toLowerCase();
    const wordCount = getWordCount(content);
    const density = getKeywordDensity(content, focusKeyword);

    return [
      {
        label: 'Focus keyword in title',
        passed: keyword && title.toLowerCase().includes(keyword),
        message: keyword ? (title.toLowerCase().includes(keyword) ? 'Great! Keyword found in title' : 'Add your focus keyword to the title') : 'Set a focus keyword first'
      },
      {
        label: 'Focus keyword in SEO title',
        passed: keyword && seoTitle.toLowerCase().includes(keyword),
        message: keyword ? (seoTitle.toLowerCase().includes(keyword) ? 'Perfect! Keyword in SEO title' : 'Include keyword in SEO title') : 'Set a focus keyword first'
      },
      {
        label: 'Focus keyword in meta description',
        passed: keyword && metaDescription.toLowerCase().includes(keyword),
        message: keyword ? (metaDescription.toLowerCase().includes(keyword) ? 'Excellent! Keyword in description' : 'Add keyword to meta description') : 'Set a focus keyword first'
      },
      {
        label: 'Focus keyword in URL',
        passed: keyword && slug.toLowerCase().includes(keyword),
        message: keyword ? (slug.toLowerCase().includes(keyword) ? 'Good! Keyword in URL slug' : 'Include keyword in URL slug') : 'Set a focus keyword first'
      },
      {
        label: 'Focus keyword in first paragraph',
        passed: keyword && firstPara.includes(keyword),
        message: keyword ? (firstPara.includes(keyword) ? 'Nice! Keyword in opening' : 'Add keyword to first paragraph') : 'Set a focus keyword first'
      },
      {
        label: 'Keyword density (0.5-2.5%)',
        passed: keyword && density >= 0.5 && density <= 2.5,
        message: keyword ? (density >= 0.5 && density <= 2.5 ? `Perfect density: ${density.toFixed(2)}%` : `Current: ${density.toFixed(2)}% (aim for 0.5-2.5%)`) : 'Set a focus keyword first'
      },
      {
        label: 'SEO title length (50-60 chars)',
        passed: seoTitle.length >= 50 && seoTitle.length <= 60,
        message: `${seoTitle.length} characters ${seoTitle.length < 50 ? '(too short)' : seoTitle.length > 60 ? '(too long)' : '(perfect!)'}`
      },
      {
        label: 'Meta description (150-160 chars)',
        passed: metaDescription.length >= 150 && metaDescription.length <= 160,
        message: `${metaDescription.length} characters ${metaDescription.length < 150 ? '(too short)' : metaDescription.length > 160 ? '(too long)' : '(perfect!)'}`
      },
      {
        label: 'Content length (300+ words)',
        passed: wordCount >= 300,
        message: `${wordCount} words ${wordCount < 300 ? '(write more)' : '(good length!)'}`
      },
      {
        label: 'Has H2/H3 headings',
        passed: hasHeadings(content),
        message: hasHeadings(content) ? 'Good structure with headings' : 'Add H2 or H3 headings for structure'
      },
      {
        label: 'Contains images',
        passed: hasImages(content),
        message: hasImages(content) ? 'Images included' : 'Add images to enhance content'
      },
      {
        label: 'Contains links',
        passed: hasLinks(content),
        message: hasLinks(content) ? 'Links present' : 'Add internal or external links'
      },
      {
        label: 'Title length (under 70 chars)',
        passed: title.length > 0 && title.length <= 70,
        message: `${title.length} characters ${title.length > 70 ? '(too long for search results)' : '(good)'}`
      },
      {
        label: 'URL slug is clean',
        passed: slug.length > 0 && /^[a-z0-9-]+$/.test(slug),
        message: /^[a-z0-9-]+$/.test(slug) ? 'Clean, SEO-friendly URL' : 'Use lowercase letters, numbers, and hyphens only'
      },
      {
        label: 'Content has focus keyword',
        passed: keyword && cleanContent.includes(keyword),
        message: keyword ? (cleanContent.includes(keyword) ? 'Keyword appears in content' : 'Use keyword naturally in content') : 'Set a focus keyword first'
      }
    ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, seoTitle, metaDescription, slug, content, focusKeyword]);

  const passedChecks = checks.filter(c => c.passed).length;
  const score = Math.round((passedChecks / checks.length) * 100);
  
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = () => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="sticky top-4 bg-white border-2 border-gray-200 shadow-lg h-fit max-h-[calc(100vh-2rem)] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">SEO Analysis</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-90">Overall Score</span>
          <div className={`text-3xl font-bold ${score >= 80 ? 'text-green-300' : score >= 60 ? 'text-yellow-300' : 'text-red-300'}`}>
            {score}%
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mt-3">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${score >= 80 ? 'bg-green-300' : score >= 60 ? 'bg-yellow-300' : 'bg-red-300'}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <p className="text-xs mt-2 opacity-75">{passedChecks} of {checks.length} checks passed</p>
      </div>

      {/* Input Fields */}
      <div className="p-6 space-y-4 border-b-2 border-gray-200">
        <div>
          <label className="block text-sm font-semibold mb-2">Focus Keyword</label>
          <input
            type="text"
            value={focusKeyword}
            onChange={(e) => onFocusKeywordChange(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-600 outline-none text-sm"
            placeholder="e.g., media training"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            SEO Title
            <span className={`ml-2 text-xs ${seoTitle.length >= 50 && seoTitle.length <= 60 ? 'text-green-600' : 'text-gray-500'}`}>
              ({seoTitle.length}/60)
            </span>
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => onSeoTitleChange(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-600 outline-none text-sm"
            placeholder="Optimized title for search engines"
            maxLength={70}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Meta Description
            <span className={`ml-2 text-xs ${metaDescription.length >= 150 && metaDescription.length <= 160 ? 'text-green-600' : 'text-gray-500'}`}>
              ({metaDescription.length}/160)
            </span>
          </label>
          <textarea
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-600 outline-none text-sm resize-none"
            placeholder="Brief description for search results"
            rows={3}
            maxLength={170}
          />
        </div>
      </div>

      {/* Checks */}
      <div className="p-6">
        <h4 className="font-bold text-sm mb-4 text-gray-700">SEO Checks ({passedChecks}/{checks.length})</h4>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {check.passed ? (
                  <CheckCircle size={18} className="text-green-600" />
                ) : (
                  <XCircle size={18} className="text-red-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">{check.label}</div>
                <div className={`text-xs mt-0.5 ${check.passed ? 'text-green-600' : 'text-gray-600'}`}>
                  {check.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Summary */}
      <div className={`p-4 ${getScoreBg()} border-t-2 border-gray-200`}>
        <div className="flex items-center space-x-2">
          <AlertCircle size={20} className={getScoreColor()} />
          <span className={`font-bold text-sm ${getScoreColor()}`}>
            {score >= 80 ? 'Excellent SEO!' : score >= 60 ? 'Good, but can improve' : 'Needs improvement'}
          </span>
        </div>
        <p className="text-xs text-gray-700 mt-1">
          {score >= 80 ? 'Your content is well-optimized for search engines.' : 
           score >= 60 ? 'Address the failed checks to improve ranking potential.' : 
           'Focus on the red items above to boost your SEO score.'}
        </p>
      </div>
    </div>
  );
}
