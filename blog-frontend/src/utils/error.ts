export function handleErrorInFrontend(error: any){
  if(error === null || error === undefined){
    return
  }
  const errorMessage = error
  let displayedError = errorMessage
  if(errorMessage === "TypeError: Failed to fetch"){
    displayedError = `Gagal mengambil data. Pastikan anda memiliki akses ke internet.`
  }
  alert(displayedError)
}
