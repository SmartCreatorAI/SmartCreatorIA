use std::collections::HashMap;

/// Analyze word frequency and additional text statistics.
pub struct TextAnalysisResult {
    pub word_frequencies: HashMap<String, usize>,
    pub total_words: usize,
    pub unique_words: usize,
    pub average_word_length: f64,
    pub most_frequent_word: Option<(String, usize)>,
}

/// Analyze text for word frequency and other statistics.
pub fn analyze_text(text: &str, stop_words: Option<Vec<&str>>) -> TextAnalysisResult {
    let stop_words_set: HashMap<String, bool> = stop_words
        .unwrap_or_default()
        .into_iter()
        .map(|word| (word.to_string(), true))
        .collect();

    let mut word_frequencies = HashMap::new();
    let mut total_word_length = 0;

    for word in text.split_whitespace() {
        let word_cleaned = word.to_lowercase();
        if stop_words_set.contains_key(&word_cleaned) {
            continue;
        }
        let count = word_frequencies.entry(word_cleaned.clone()).or_insert(0);
        *count += 1;
        total_word_length += word_cleaned.len();
    }

    let total_words = word_frequencies.values().sum::<usize>();
    let unique_words = word_frequencies.len();
    let average_word_length = if total_words > 0 {
        total_word_length as f64 / total_words as f64
    } else {
        0.0
    };

    let most_frequent_word = word_frequencies
        .iter()
        .max_by_key(|&(_, count)| count)
        .map(|(word, count)| (word.clone(), *count));

    TextAnalysisResult {
        word_frequencies,
        total_words,
        unique_words,
        average_word_length,
        most_frequent_word,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_analyze_text() {
        let text = "Hello world Hello Rust Rust Rust programming";
        let result = analyze_text(text, None);

        assert_eq!(result.total_words, 6);
        assert_eq!(result.unique_words, 4);
        assert_eq!(result.word_frequencies.get("hello"), Some(&2));
        assert_eq!(result.word_frequencies.get("rust"), Some(&3));
        assert_eq!(result.word_frequencies.get("programming"), Some(&1));
        assert!(result.average_word_length > 0.0);
        assert_eq!(result.most_frequent_word, Some(("rust".to_string(), 3)));
    }

    #[test]
    fn test_analyze_text_with_stop_words() {
        let text = "Hello world Hello Rust Rust Rust programming";
        let stop_words = vec!["hello", "rust"];
        let result = analyze_text(text, Some(stop_words));

        assert_eq!(result.total_words, 2);
        assert_eq!(result.unique_words, 2);
        assert_eq!(result.word_frequencies.get("world"), Some(&1));
        assert_eq!(result.word_frequencies.get("programming"), Some(&1));
        assert_eq!(result.most_frequent_word, Some(("world".to_string(), 1)));
    }

    #[test]
    fn test_empty_text() {
        let text = "";
        let result = analyze_text(text, None);

        assert_eq!(result.total_words, 0);
        assert_eq!(result.unique_words, 0);
        assert_eq!(result.average_word_length, 0.0);
        assert_eq!(result.most_frequent_word, None);
    }
}
