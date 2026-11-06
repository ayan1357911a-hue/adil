import { Product } from '../types';
import auroraNecklace from '../assets/images/product_aurora_necklace_1790494503656.jpg';
import celestialEarrings from '../assets/images/product_celestial_earrings_1790494518918.jpg';
import solsticeBracelet from '../assets/images/product_solstice_bracelet_1790494533616.jpg';
import serenadeRing from '../assets/images/product_serenade_ring_1790494543985.jpg';
import lumiereNecklace from '../assets/images/product_lumiere_necklace_1790496137766.jpg';
import emeraldEarrings from '../assets/images/product_emerald_earrings_1790496154669.jpg';
import pearlBangle from '../assets/images/product_pearl_bangle_1790496170267.jpg';
import eternityRing from '../assets/images/product_eternity_ring_1790496184242.jpg';
import goldLocket from '../assets/images/product_gold_locket_1790496674463.jpg';
import sapphireRing from '../assets/images/product_sapphire_ring_1790496689310.jpg';
import pearlDrops from '../assets/images/product_pearl_drops_1790496702047.jpg';
import tennisBracelet from '../assets/images/product_tennis_bracelet_1790496714437.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'aura-01',
    name: 'The Aurora Pearl Choker',
    category: 'necklaces',
    categoryLabel: 'Necklaces',
    price: 3850,
    originalPrice: 4500,
    image: auroraNecklace,
    tag: 'Bestseller',
    description: 'An ethereal layered necklace crafted in 18k yellow gold vermeil, featuring an authentic teardrop freshwater pearl designed to sit delicately on the collarbone.',
    material: '18k Gold Vermeil over 925 Sterling Silver & Cultured Freshwater Pearl',
    details: [
      'Adjustable length: 14" to 16" with 2" extension',
      'Hypoallergenic & nickel-free for sensitive skin',
      'Anti-tarnish protective micro-coating',
      'Signature Aura & Co. luxury blush box included'
    ],
    inStock: true
  },
  {
    id: 'aura-02',
    name: 'Celestial Bloom Hoops',
    category: 'earrings',
    categoryLabel: 'Earrings',
    price: 2950,
    originalPrice: 3400,
    image: celestialEarrings,
    tag: 'Handcrafted',
    description: 'Petite huggie hoops with sculpted floral silhouettes and hand-set pavé crystals that catch the gentle afternoon light with every subtle turn.',
    material: '18k Gold Vermeil with Brilliant Cut Cubic Zirconia',
    details: [
      'Outer diameter: 14mm, Inner diameter: 10mm',
      'Secure click-latch closure for all-day comfort',
      'Water and sweat resistant daily wear',
      'Comes with branded microfiber polishing pouch'
    ],
    inStock: true
  },
  {
    id: 'aura-03',
    name: 'Solstice Rose Quartz Bangle',
    category: 'bracelets',
    categoryLabel: 'Bracelets & Cuffs',
    price: 3400,
    originalPrice: 3900,
    image: solsticeBracelet,
    tag: 'New Edition',
    description: 'A minimal cable-link bracelet accentuated by a raw-cut translucent rose quartz gemstone, symbolizing tender love, harmony, and gentle grace.',
    material: '18k Gold Vermeil with Natural Rose Quartz',
    details: [
      'Length: 6.5" with 1.5" lobster clasp extender',
      'Genuine hand-selected natural pink quartz',
      'Ultra-lightweight 4.2g ergonomic weight',
      'Includes certificate of authenticity card'
    ],
    inStock: true
  },
  {
    id: 'aura-04',
    name: 'Serenade Baguette Ring',
    category: 'rings',
    categoryLabel: 'Rings',
    price: 2200,
    originalPrice: 2600,
    image: serenadeRing,
    tag: 'Limited Run',
    description: 'A contemporary twisted rope band crowned with an emerald-cut crystal baguette. Ideal for stacking or making a solo minimalist statement.',
    material: '18k Gold Vermeil with Baguette Zirconia',
    details: [
      'Comfort-fit band (adjustable ring size US 6-8)',
      'High-polish mirror gold finish',
      'Zero discoloration guarantee',
      'Gift packaging with personalized note card'
    ],
    inStock: true
  },
  {
    id: 'aura-05',
    name: 'Lumière Snake Chain Necklace',
    category: 'necklaces',
    categoryLabel: 'Necklaces',
    price: 3200,
    originalPrice: 3750,
    image: lumiereNecklace,
    tag: 'Signature Piece',
    description: 'Silky smooth flat herringbone chain that drapes like liquid gold against the skin. High-reflectivity finish with seamless fluid links.',
    material: '18k Heavy Gold Vermeil (3 Microns) over 925 Silver',
    details: [
      'Width: 3.5mm flat herringbone weave',
      'Length: 16" with 2" custom lobster extension',
      'Tarnish-proof protective polymer nano-seal',
      'Signature velvet traveling keepsake pouch'
    ],
    inStock: true
  },
  {
    id: 'aura-06',
    name: 'Vintage Emerald Solitaire Studs',
    category: 'earrings',
    categoryLabel: 'Earrings',
    price: 2650,
    originalPrice: 3100,
    image: emeraldEarrings,
    tag: 'Royal Heritage',
    description: 'Timeless art-deco inspired solitaire studs featuring deep forest emerald crystals prong-set in quadruple gold claws with butterfly friction backs.',
    material: '18k Gold Vermeil with Hydrothermal Emerald Gemstones',
    details: [
      'Gemstone size: 7mm x 5mm emerald cut',
      'Hypoallergenic surgical steel posts for zero irritation',
      'Deep emerald saturation with crystalline facets',
      'Gift box packaging included'
    ],
    inStock: true
  },
  {
    id: 'aura-07',
    name: 'Monique Twin Baroque Pearl Cuff',
    category: 'bracelets',
    categoryLabel: 'Bracelets & Cuffs',
    price: 3600,
    originalPrice: 4200,
    image: pearlBangle,
    tag: 'Artisan Choice',
    description: 'An open-cuff silhouette tipped with natural lustrous freshwater baroque pearls. Flexible spring-tension core easily fits all wrist circumferences.',
    material: '18k Gold Vermeil & Natural Baroque Cultured Pearls',
    details: [
      'Flexible open cuff design, circumference 6.0" - 7.5"',
      'Each baroque pearl is naturally unique in shape and sheen',
      'Smooth rounded ends ensure snag-free wearing',
      'Embossed suede presentation case'
    ],
    inStock: true
  },
  {
    id: 'aura-08',
    name: 'Eternity Pavé Stacking Band',
    category: 'rings',
    categoryLabel: 'Rings',
    price: 2450,
    originalPrice: 2850,
    image: eternityRing,
    tag: 'Timeless Classic',
    description: 'A 360-degree continuous band set with brilliant micro-pavé crystals. Understated luxury that pairs seamlessly with solitaires or bands.',
    material: '18k Gold Vermeil with Round Brilliant Cut Zirconia',
    details: [
      'Micro-pavé channel setting preventing stone loss',
      'Band width: 2.0mm dainty profile',
      'Comfort bevel curve on inner surface',
      'Anti-tarnish guarantee certificate'
    ],
    inStock: true
  },
  {
    id: 'aura-09',
    name: 'Vintage Engraved Medallion Locket',
    category: 'necklaces',
    categoryLabel: 'Necklaces',
    price: 4100,
    originalPrice: 4800,
    image: goldLocket,
    tag: 'Heirloom',
    description: 'An intricately floral-engraved oval pendant locket that opens to hold two miniature sentimental photographs. Hung on a delicate rope chain.',
    material: '18k Gold Vermeil over 925 Sterling Silver',
    details: [
      'Locket dimensions: 22mm x 16mm oval',
      'Chain length: 18" + 2" extender',
      'Functional snap-hinge mechanism for photographs',
      'Complimentary photo template and gift pouch'
    ],
    inStock: true
  },
  {
    id: 'aura-10',
    name: 'Royal Sapphire Halo Ring',
    category: 'rings',
    categoryLabel: 'Rings',
    price: 2850,
    originalPrice: 3300,
    image: sapphireRing,
    tag: 'New Drop',
    description: 'An intense royal blue oval sapphire center stone embraced by a shimmering celestial halo of micro-pavé crystals on a dainty tapered band.',
    material: '18k Gold Vermeil with Lab-Grown Royal Sapphire',
    details: [
      'Center sapphire: 8mm x 6mm oval cut',
      'Micro-pavé halo with 16 brilliant-cut crystals',
      'Anti-tarnish protective rhodium-gold hybrid finish',
      'Signature velvet ring box included'
    ],
    inStock: true
  },
  {
    id: 'aura-11',
    name: 'Baroque Pearl Threader Drops',
    category: 'earrings',
    categoryLabel: 'Earrings',
    price: 2750,
    originalPrice: 3200,
    image: pearlDrops,
    tag: 'Limited Edition',
    description: 'Fluid gold threader chains anchored by iridescent natural baroque pearls that sway with effortless movement. Ultra-comfortable for sensitive ears.',
    material: '18k Gold Vermeil with Genuine Baroque Pearls',
    details: [
      'Total drop length: 55mm adjustable drape',
      'Organic natural pearl shape guarantees uniqueness',
      'Featherlight 2.8g weight per pair',
      'Protective jewelry pouch included'
    ],
    inStock: true
  },
  {
    id: 'aura-12',
    name: 'Gilded Bezel Tennis Bracelet',
    category: 'bracelets',
    categoryLabel: 'Bracelets & Cuffs',
    price: 3950,
    originalPrice: 4600,
    image: tennisBracelet,
    tag: 'Luxury Favorite',
    description: 'A modern revision of the iconic tennis bracelet with bezel-encased cubic zirconia stones. Offers smooth, snag-free wear with double safety claps.',
    material: '18k Gold Vermeil with Bezel-Set Flawless Zirconia',
    details: [
      'Bracelet length: 7" with 0.75" fold-over extender',
      'Stone diameter: 3mm round brilliant cut',
      'Double latch security clasp',
      'Lifetime guarantee against stone loosening'
    ],
    inStock: true
  }
];
