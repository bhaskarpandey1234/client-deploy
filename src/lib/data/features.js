// Replace VIDEO_ID_* with your real YouTube IDs.
// You can set one story as spotlight:true; otherwise the most recent (publishedAt) is used.

export const STORIES = [
  {
    slug: 'akashic-awakening-ana',
    youtubeId: 'VIDEO_ID_1',
    title: 'From Skeptic to Seeker: Akashic Awakening',
    guest: 'Ana M.',
    role: 'Designer, Belgrade',
    summary:
      'Ana describes a spontaneous eclipse-night experience that reframed how she sees timing and destiny.',
    quote: '"I felt time fold around me."',
    duration: '07:42',
    publishedAt: '2025-10-12',
    spotlight: true,
    tags: ['Akashic', 'Eclipse', 'Serbia']
  },
  {
    slug: 'numerology-turning-point-luca',
    youtubeId: 'VIDEO_ID_2',
    title: 'Numerology at a Crossroads',
    guest: 'Luca R.',
    role: 'Engineer, Milan',
    summary:
      'How a Personal Year reading helped Luca choose a calmer path after burnout.',
    quote: '"It gave me permission to slow down."',
    duration: '05:18',
    publishedAt: '2025-09-28',
    tags: ['Numerology', 'Personal Year', 'Italy']
  },
  {
    slug: 'tarot-clarity-natasha',
    youtubeId: 'VIDEO_ID_3',
    title: 'Clarity from Three Cards',
    guest: 'Natasha S.',
    role: 'Writer, Warsaw',
    summary:
      'A simple spread illuminated a tough decision about moving countries.',
    quote: '"It felt like a mirror with kindness."',
    duration: '04:31',
    publishedAt: '2025-09-05',
    tags: ['Tarot', 'Decision', 'Poland']
  }
];

// Optional helper to compute a thumbnail if you don't want to add your own images.
// Returns a webp thumbnail from YouTube's CDN.
export const ytThumb = (id) =>
  id ? `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp` : '';
