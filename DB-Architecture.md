Tutoriels :
   - id (ObjectId)
   - Nom (String 50)
   - Description (String 250)
   - Note (Float 0.0 to 5.0)
   - Langue (String 2 | Locale : fr, en)
   - Language (String 50 | Html, Js, Php, Java)
   - Technologie (Angular, React)
   - Date création (Timestamp)
   - Type (vidéo, texte)
   - Commentaires? (Array of objects {userId, comment})

User :
   - id (ObjectId)
	- Token (From github, for login)
	- Notes données aux tutos (Array of objects {tutoId, note})


Commentaires?:
	- UserID
	- Text
	- Date
	- Votes
