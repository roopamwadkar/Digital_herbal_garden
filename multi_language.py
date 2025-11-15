import openai

def translate_text(text_to_translate, target_language, context="herbal remedies and plant details"):
    client = openai.OpenAI(api_key="------")

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": f"You are a helpful assistant for a chatbot that provides information on {context}. Translate the following text into {target_language}."},
            {"role": "user", "content": text_to_translate}
        ],
        temperature=0.3
    )
    return response.choices[0].message.content

# Example usage
plant_info = "Echinacea, also known as the coneflower, is a popular herbal remedy used to boost the immune system and fight off infections."
translated_info = translate_text(plant_info, "Spanish")

print(f"Original: {plant_info}")
print(f"Translated: {translated_info}")