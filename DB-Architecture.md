Tutoriels :
   - id (ObjectId)
   - title (String 50)
   - description (String 250)
   - ratings [
      Number (Float 0.0 to 5.0)
      Author (ObjectId)
      Date (automatic)
   ]
   - lang (String 2 | Locale : fr, en)
   - techno [
      String (Angular, React)
   ]
   - dateCreation (Date) 
   - datePost (Date)
   - media (video, github)
   - author (String)
   - price (Number)
   - isValid (Boolean)
   - flags [
      {
         date: timestamp,
         author: String
      }
   ]
   - link (String)