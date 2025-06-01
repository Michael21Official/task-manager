# Task Manager

Task Manager to aplikacja webowa do zarządzania zadaniami, napisana w React z TypeScriptem. Pozwala tworzyć, edytować, oznaczać jako ważne, przenosić między kolumnami oraz usuwać zadania. Dane użytkownika są zapisywane w cookies.

## Demo

Aplikacja jest dostępna na GitHub Pages:  
[https://Michael21Official.github.io/task-manager](https://Michael21Official.github.io/task-manager)

## Funkcje

- Tworzenie i usuwanie kolumn (np. To Do, Working, Done)
- Dodawanie, edycja i usuwanie zadań
- Przenoszenie zadań między kolumnami (drag & drop lub przyciskiem)
- Oznaczanie zadań jako ważne
- Ustawianie deadline i priorytetu zadania
- Statystyki zadań i kolumn
- Przechowywanie danych w cookies (po zalogowaniu)
- Obsługa wielu tablic użytkowników

## Instalacja

1. Sklonuj repozytorium:
   ```
   git clone https://github.com/Michael21Official/task-manager.git
   cd task-manager
   ```

2. Zainstaluj zależności:
   ```
   npm install
   ```

3. Uruchom aplikację lokalnie:
   ```
   npm start
   ```
   Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

## Deployment na GitHub Pages

1. Upewnij się, że w pliku `package.json` jest pole:
   ```json
   "homepage": "https://Michael21Official.github.io/task-manager"
   ```
2. Zbuduj i opublikuj aplikację:
   ```
   npm run deploy
   ```
   Po chwili aplikacja będzie dostępna pod powyższym adresem.

## Struktura projektu

- `src/components` – komponenty React (Board, Column, TaskCard, ChangeColumn, Login)
- `src/types.ts` – typy TypeScript dla zadań, kolumn, tablicy
- `src/styles` – pliki CSS

## Technologie

- React 19
- TypeScript
- js-cookie
- uuid
- chart.js + react-chartjs-2 (statystyki)
- gh-pages (deploy)

## Autor

Projekt stworzony przez [Michael21Official](https://github.com/Michael21Official).

---

**Licencja:** MIT
