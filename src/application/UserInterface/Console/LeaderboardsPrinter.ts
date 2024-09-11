export class LeaderboardsPrinter {
    printLeaderboard(records: { player: string, rounds: number, difficulty: 1|2|3 }[]) {
        console.log(`+++ Pontuações dificuldade ${records[0].difficulty} +++`)

        console.log('   Jogador                Rodadas')

        records.forEach((record, index) => {
            console.log(`${index + 1}. ${record.player}                ${record.rounds}`)
        })
    }
}