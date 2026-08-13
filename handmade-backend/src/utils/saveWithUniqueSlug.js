/**
 * Записва продукт с гарантирано уникален slug.
 * Разчита на unique индекса на slug полето — при E11000 добавя суфикс и опитва пак.
 * ВАЖНО: използвай ТОВА вместо product.save() при create и при update на title,
 * иначе губиш защитата от дублирани slug-ове при конкурентни записи.
 */

export async function saveWithUniqueSlug(doc, attempt = 0) {
    try {
        return await doc.save();
    } catch (err) {
        if (err.code === 11000 && err.keyPattern?.slug) {
            const base = doc._slugBase ?? doc.slug.replace(/-\d+$/, "");
            doc.slug = `${base}-${attempt + 1}`;
            return saveWithUniqueSlug(doc, attempt + 1);
        }
        throw err;
    }
}
