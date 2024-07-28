fonction positionnement(données) {

    pour chaque événement dans données.events faire
        
        si l'événement n'est pas pour la date courante alors
            arrêter le processus
        
        sinon
            début = trouverPosition(événement.dateDébut)
            fin = trouverPosition(événement.dateFin)

            remplirCases(événement, début, fin)
    fin pour
}
