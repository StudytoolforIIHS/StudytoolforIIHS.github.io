import { games as gamesData, ogGames, isOgGame } from './games';

const ogTitlesSet = new Set(ogGames.map(g => g.title));

export const games = [...gamesData].map((game, index) => {
  const isOriginal = Boolean(game.isOriginal || game.isOg || ogTitlesSet.has(game.title) || isOgGame(game));
  if (!game.id) {
    const slug = (game.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return {
      ...game,
      id: `game-gen-${index}-${slug}`,
      isOriginal,
      isOg: isOriginal
    };
  }
  return {
    ...game,
    isOriginal,
    isOg: isOriginal
  };
}).sort((a, b) => {
  const aAi = a.isAiGenerated === true || a.isAiGenerated === 'true';
  const bAi = b.isAiGenerated === true || b.isAiGenerated === 'true';
  if (aAi && !bAi) return 1;
  if (!aAi && bAi) return -1;

  const aFeatured = a.featured === true || a.featured === 'true';
  const bFeatured = b.featured === true || b.featured === 'true';
  if (aFeatured && !bFeatured) return -1;
  if (!aFeatured && bFeatured) return 1;
  return 0;
}).map((game) => ({
  ...game,
  searchText: `${game.title || ''} ${game.description || ''} ${game.category || ''}`.toLowerCase()
}));
